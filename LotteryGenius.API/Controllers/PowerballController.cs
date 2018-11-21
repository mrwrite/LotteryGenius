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
    public class PowerballController : Controller
    {
        private readonly IPowerballRepository _powerballRepository;
        private readonly ILogger<PowerballController> _logger;
        private readonly IMapper _mapper;
        private readonly LotteryGeniusContext _ctx;
        private readonly UserManager<LotteryGeniusUser> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;

        public PowerballController(IPowerballRepository powerballRepository, ILogger<PowerballController> logger, IMapper mapper, LotteryGeniusContext ctx)
        {
            _powerballRepository = powerballRepository;
            _logger = logger;
            _mapper = mapper;
            _ctx = ctx;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get()
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
        public async Task<IActionResult> GetLatestPowerball()
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

        [HttpGet]
        [Route("/api/powerball/GetNextPowerball")]
        public async Task<IActionResult> GetNextPowerball()
        {
            try
            {
                return Ok(_powerballRepository.GetNextPowerballJackpot());
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get next powerball: {e}");
                return Json("Bad Request");
            }
        }

        [HttpGet]
        [Route("/api/powerball/PowerballPicks")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult PowerballPicks()
        {
            try
            {
                return Ok(_powerballRepository.GetPowerballPicks());
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get powerball Picks: {e}");
                return Json("Bad Request");
            }
        }

        [HttpGet]
        [Route("/api/powerball/AllPowerPicks")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult AllPowerPicks()
        {
            try
            {
                return Ok(_mapper.Map<IEnumerable<PowerballPicks>, IEnumerable<PowerPicksViewModel>>(
                    _powerballRepository.GetAllPowerballPicks()));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get all picks: {e}");
                return Json("Bad Request");
            }
        }

        [HttpGet]
        [Route("/api/powerball/GetPowerballWinners")]
        public IActionResult GetPowerballWinners()
        {
            try
            {
                return Ok(_powerballRepository.GetPowerBallWinners());
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get winners: {e}");
                return Json("Bad Request");
            }
        }

        [HttpPost]
        [Route("/api/powerball/AddUserPicks")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post([FromBody] IEnumerable<UserPick> picks)
        {
            try
            {
                _powerballRepository.AddUserPicks(picks);
                if (_powerballRepository.SaveAll())
                {
                    return Ok();
                }
                else
                {
                    return BadRequest($"Save wasn't successful");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost]
        [Route("/api/powerball/AddManualUserPick")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post([FromBody] UserPick pick)
        {
            try
            {
                this._powerballRepository.AddManualUserPick(pick);
                if (_powerballRepository.SaveAll())
                {
                    return this.Ok();
                }
                else
                {
                    return this.BadRequest($"Save of manual pick wasn't successful");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("/api/powerball/GetUserPicks/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUserPicks(int id)
        {
            return Ok(this._powerballRepository.GetUserPicks(id));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post([FromBody]PowerballViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newNumber = _mapper.Map<PowerballViewModel, Powerball>(model);
                    if (_powerballRepository != null)
                    {
                        _powerballRepository.AddPowerballNumber(newNumber);
                        if (_powerballRepository.SaveAll())
                        {
                            return Created($"/api/powerball/{newNumber.id}",
                                _mapper.Map<Powerball, PowerballViewModel>(newNumber));
                        }
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"Could not save Powerball: {e}");
                return null;
            }

            return BadRequest("Failed to save new Powerball");
        }

        [HttpGet]
        [Route("/api/powerball/ShowPowerballWinners")]
        public IActionResult ShowPowerballWinners()
        {
            try
            {
                return Ok(_powerballRepository.ShowPowerballWinners());
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get winning pairs: {e}");
                return null;
            }
        }

        [HttpGet]
        [Route("/api/powerball/GetUserPowerballWinners/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetUserPowerballWinners(int id)
        {
            try
            {
                return this.Ok(this._powerballRepository.GetUserPowerballWinners(id));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("/api/powerball/GetPowerballDetails")]
        public IActionResult GetPowerballDetails()
        {
            try
            {
                _powerballRepository.GetPowerballDetails();

                if (_powerballRepository.SaveAll())
                {
                    return Ok();
                }
                else
                {
                    //return BadRequest($"Save wasn't successful");
                    return NoContent();
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get Powerball Details: {e}");
                return null;
            }
        }

        [HttpGet]
        [Route("/api/powerball/GetUserWinningPicks/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUserWinningPicks(int id)
        {
            return Ok(this._powerballRepository.GetUserWinningPicks(id));
        }
    }
}