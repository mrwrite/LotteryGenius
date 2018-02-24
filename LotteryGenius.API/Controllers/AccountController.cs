using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LotteryGenius.API.Data.Entities;
using LotteryGenius.API.ViewModels;

namespace MeticulousMentoring.API.Controllers
{
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Logging;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;

    [EnableCors("LotteryGenius")]
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> logger;

        private readonly SignInManager<LotteryGeniusUser> signInManager;

        private readonly UserManager<LotteryGeniusUser> userManager;

        private readonly IConfiguration config;

        private readonly RoleManager<IdentityRole<int>> roleManager;

        public AccountController(ILogger<AccountController> logger, SignInManager<LotteryGeniusUser> signInManager, UserManager<LotteryGeniusUser> userManager,
            IConfiguration config, RoleManager<IdentityRole<int>> roleManager)
        {
            this.logger = logger;
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.config = config;
            this.roleManager = roleManager;
        }

        //public IActionResult Login()
        //{
        //    if (User.Identity.IsAuthenticated)
        //    {
        //        return RedirectToAction("Index", "Values");
        //    }

        //    return this.View();
        //}

        //[HttpPost]
        //public async Task<IActionResult> Login(LoginViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var result = await this.signInManager.PasswordSignInAsync(
        //            model.Username,
        //            model.Password,
        //            model.RememeberMe,
        //            false);

        //        if (result.Succeeded)
        //        {
        //            if (Request.Query.Keys.Contains("ReturnUrl"))
        //            {
        //                Redirect(Request.Query["ReturnUrl"].First());
        //            }
        //            else
        //            {
        //                RedirectToAction("Index", "Values");
        //            }
        //        }
        //    }

        //    ModelState.AddModelError("", "Failed to login");

        //    return this.View();
        //}

        //[HttpGet]
        //public async Task<IActionResult> Logout()
        //{
        //    await this.signInManager.SignOutAsync();
        //    return RedirectToAction("Index", "Values");
        //}

        [HttpPost]
        public async Task<IActionResult> CreateToken([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await this.userManager.FindByNameAsync(model.Username);

                if (user != null)
                {
                    var result = await this.signInManager.CheckPasswordSignInAsync(user, model.Password, false);

                    if (result.Succeeded)
                    {
                        //// Create token
                        var claims = new List<Claim>(new[]
                                         {
                                             new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                                             new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                                             new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                                             new Claim(JwtRegisteredClaimNames.Iat, user.Id.ToString())
                                         });

                        claims.AddRange(await this.userManager.GetClaimsAsync(user));

                        var roleNames = await this.userManager.GetRolesAsync(user);

                        foreach (var roleName in roleNames)
                        {
                            var role = await this.roleManager.FindByNameAsync(roleName);
                            if (role != null)
                            {
                                var roleClaim = new Claim("role", role.Name, ClaimValueTypes.String);
                                claims.Add(roleClaim);

                                var roleClaims = await this.roleManager.GetClaimsAsync(role);
                                claims.AddRange(roleClaims);
                            }
                        }

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config["Tokens:Key"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(this.config["Tokens:Issuer"],
                            this.config["Tokens:Audience"],
                            claims,
                            expires: DateTime.UtcNow.AddMinutes(20),
                            signingCredentials: creds);

                        var results = new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo
                        };

                        return Created("", results);
                    }
                }
            }

            return this.BadRequest();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<List<LotteryGeniusUser>> GetUsers()
        {
            using (userManager)
            {
                return await userManager.Users.ToListAsync();
            }
        }
    }
}