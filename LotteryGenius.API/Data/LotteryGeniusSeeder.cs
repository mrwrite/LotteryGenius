using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LotteryGenius.API.Data.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;

namespace LotteryGenius.API.Data
{
    public class LotteryGeniusSeeder
    {
        private readonly LotteryGeniusContext _ctx;
        private readonly IHostingEnvironment _hosting;
        private readonly UserManager<LotteryGeniusUser> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;

        public LotteryGeniusSeeder(LotteryGeniusContext ctx, IHostingEnvironment hosting, UserManager<LotteryGeniusUser> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            _ctx = ctx;
            _hosting = hosting;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task Seed()
        {
            _ctx.Database.EnsureCreated();
            string[] roles = { "Admin", "Viewer", "Editor" };

            foreach (var role in roles)
            {
                var roleExist = await _roleManager.RoleExistsAsync(role);
                if (!roleExist)
                {
                    await _roleManager.CreateAsync(new IdentityRole<int>(role));
                }
            }

            ////Add Admin user
            var user = await _userManager.FindByEmailAsync("aqwright@gmail.com");

            if (user == null)
            {
                user = new LotteryGeniusUser()
                {
                    UserName = "aqwright@gmail.com",
                    Email = "aqwright@gmail.com",
                    FirstName = "Anthony",
                    LastName = "Wright"
                };

                var result = await _userManager.CreateAsync(user, "War3agle!");
                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Failed to create default user");
                }
                else
                {
                    await _userManager.AddToRoleAsync(user, "Admin");
                }
            }
            //// End Add Admin User
        }
    }
}