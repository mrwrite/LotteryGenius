using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.API.Controllers
{
    using AutoMapper;

    using LotteryGenius.API.Data;
    using LotteryGenius.API.Data.Entities;
    using LotteryGenius.API.Data.Repositories;

    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    public class SettingsController : Controller
    {
        private readonly ISettingsRepository settingsRepository;
        private readonly ILogger<SettingsController> logger;
        private readonly IMapper mapper;
        private readonly LotteryGeniusContext ctx;
        private readonly UserManager<LotteryGeniusUser> userManager;
        private readonly RoleManager<IdentityRole<int>> roleManager;

        public SettingsController(ISettingsRepository settingsRepository,
                                  ILogger<SettingsController> logger,
                                  IMapper mapper,
                                  LotteryGeniusContext ctx,
                                  UserManager<LotteryGeniusUser> userManager,
                                  RoleManager<IdentityRole<int>> roleManager)
        {
            this.settingsRepository = settingsRepository;
            this.logger = logger;
            this.mapper = mapper;
            this.ctx = ctx;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        [HttpGet]
        [Route("/api/settings/GetUserPlayer/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetUserPlayer(int id)
        {
            try
            {
                return this.Ok(this.settingsRepository.GetUserPlayer(id));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("/api/settings/AddUserPlayer")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AddUserPlayer([FromBody]UserPlayer player)
        {
            try
            {
                this.settingsRepository.AddPlayer(player);
                if (this.ctx.SaveChanges() > 0)
                {
                    return this.Ok();
                }
                else
                {
                    return this.BadRequest($"Add wasn't successful");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPut]
        [Route("/api/settings/EditPlayer")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> EditPlayer([FromBody] UserPlayer player)
        {
            try
            {
                this.settingsRepository.EditPlayer(player);
                if (this.ctx.SaveChanges() > 0)
                {
                    return this.Ok(StatusCode(201));
                }
                else
                {
                    return StatusCode(500, "Internal Server Error");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}