using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using LotteryGenius.API.Data;
using LotteryGenius.API.Data.Entities;
using LotteryGenius.API.Data.Repositories;
using LotteryGenius.API.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LotteryGenius.API.Controllers
{
    [Route("api/[Controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PowerballController : Controller
    {
        private readonly IPowerballRepository _powerballRepository;
        private readonly ILogger<PowerballController> _logger;
        private readonly IMapper _mapper;
        private readonly LotteryGeniusContext _ctx;
        private readonly UserManager<LotteryGeniusUser> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;

        public PowerballController(IPowerballRepository powerballRepository, ILogger<PowerballController> logger, IMapper mapper, LotteryGeniusContext ctx, UserManager<LotteryGeniusUser> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            _powerballRepository = powerballRepository;
            _logger = logger;
            _mapper = mapper;
            _ctx = ctx;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public IActionResult Get()
        {
            try
            {
                return Ok(
                    _mapper.Map<IEnumerable<Powerball>, IEnumerable<PowerballViewModel>>(_powerballRepository
                        .GetPowerballs()));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get powerballs: {e}");
                return Json("Bad request");
            }
        }

        [HttpGet]
        [Route("/api/powerball/GetLatestPowerball")]
        public IActionResult GetLatestPowerball()
        {
            try
            {
                return Ok(_mapper.Map<Powerball, PowerballViewModel>(_powerballRepository.GetLastPowerball()));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get latest powerball: {e}");
                return Json("Bad request");
            }
        }
    }
}