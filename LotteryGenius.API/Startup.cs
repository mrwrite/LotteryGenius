using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using LotteryGenius.API.Data;
using LotteryGenius.API.Data.Entities;
using LotteryGenius.API.Data.Repositories;
using LotteryGenius.API.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace LotteryGenius.API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentity<LotteryGeniusUser, IdentityRole<int>>(
                cfg =>
                {
                    cfg.User.RequireUniqueEmail = true;
                    cfg.Lockout.MaxFailedAccessAttempts = 4;
                    cfg.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromDays(365 * 200);
                }).AddEntityFrameworkStores<LotteryGeniusContext>();

            services.AddAuthentication()
                .AddCookie()
                .AddJwtBearer(cfg =>
                {
                    cfg.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidIssuer = _configuration["Tokens:Issuer"],
                        ValidAudience = _configuration["Tokens:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]))
                    };
                });

            services.AddDbContext<LotteryGeniusContext>(
                cfg => { cfg.UseSqlServer(_configuration.GetConnectionString("LotteryGeniusConnectionString")); });

            services.AddAutoMapper();
            services.AddTransient<LotteryGeniusSeeder>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddScoped<IPowerballRepository, PowerballRepository>();
            services.AddScoped<IMegamillionRepository, MegamillionRepository>();

            services.AddCors(
                cfg =>
                {
                    cfg.AddPolicy("LotteryGenius",
                        bldr => { bldr.AllowAnyHeader().AllowAnyMethod().WithOrigins(_configuration["WebsiteOrigin"]); });

                    cfg.AddPolicy("AnyGET",
                        bldr => { bldr.AllowAnyHeader().WithMethods("GET").AllowAnyOrigin(); });
                });

            services.AddMvc(opt =>
            {
                if (_env.IsProduction())
                {
                    opt.Filters.Add(new RequireHttpsAttribute());
                }
            })
             .AddJsonOptions(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            services.AddSingleton<IConfiguration>(_configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("LotteryGenius");

            app.UseAuthentication();

            app.UseMvc(config => { config.MapRoute("LotteryGeniusAPIRoute", "api/{controller}/{action}"); });
        }
    }
}