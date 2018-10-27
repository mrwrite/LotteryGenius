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
    public class MegamillionController : Controller
    {
        private readonly IMegamillionRepository _megamillionRepository;
        private readonly ILogger<MegamillionController> _logger;
        private readonly IMapper _mapper;
        private readonly LotteryGeniusContext _ctx;
        private readonly UserManager<LotteryGeniusUser> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;

        public MegamillionController(IMegamillionRepository megamillionRepository, ILogger<MegamillionController> logger, IMapper mapper, LotteryGeniusContext ctx, UserManager<LotteryGeniusUser> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            _megamillionRepository = megamillionRepository;
            _logger = logger;
            _mapper = mapper;
            _ctx = ctx;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Get()
        {
            try
            {
                return Ok(
                    _mapper.Map<IEnumerable<Megamillion>, IEnumerable<MegamillionViewModel>>(_megamillionRepository
                        .GetMegamillions()));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get megamillions: {e}");
                return Json("Bad request");
            }
        }

        [HttpGet]
        [Route("/api/megamillion/GetLatestMegamillion")]
        public IActionResult GetLatestMegamillion()
        {
            try
            {
                return Ok(_mapper.Map<Megamillion, MegamillionViewModel>(_megamillionRepository.GetLastMegamillion()));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get latest megamillion: {e}");
                return Json("Bad request");
            }
        }

        [HttpGet]
        [Route("/api/megamillion/GetNextMegamillion")]
        public IActionResult GetNextMegamillion()
        {
            try
            {
                return Ok(_megamillionRepository.GetNextMegamillionJackpot());
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get next megamillion: {e}");
                return Json("Bad Request");
            }
        }

        [HttpGet]
        [Route("/api/megamillion/MegamillionPicks")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult MegamillionPicks()
        {
            try
            {
                return Ok(_megamillionRepository.GetMegamillionPicks());
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get megamillion Picks: {e}");
                return Json("Bad Request");
            }
        }

        [HttpGet]
        [Route("/api/megamillion/AllMegaPicks")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult AllMegaPicks()
        {
            try
            {
                return Ok(_mapper.Map<IEnumerable<MegamillionPicks>, IEnumerable<MegaPicksViewModel>>(
                    _megamillionRepository.GetAllMegamillionPicks()));
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get all picks: {e}");
                return Json("Bad Request");
            }
        }

        [HttpGet]
        [Route("/api/megamillion/GetMegamillionWinners")]
        public IActionResult GetMegamillionWinners()
        {
            try
            {
                return Ok(_megamillionRepository.GetMegamillionWinners());
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get winners: {e}");
                return Json("Bad Request");
            }
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post([FromBody]MegamillionViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newNumber = _mapper.Map<MegamillionViewModel, Megamillion>(model);
                    _megamillionRepository.AddMegamillionNumber(newNumber);
                    if (_megamillionRepository.SaveAll())
                    {
                        return Created($"/api/megamillion/{newNumber.id}",
                            _mapper.Map<Megamillion, MegamillionViewModel>(newNumber));
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"Could not save Megamillion: {e}");
                return null;
            }

            return BadRequest("Failed to save new Megamillion");
        }

        [HttpGet]
        [Route("/api/megamillion/ShowMegamillionWinners")]
        public IActionResult ShowMegamillionWinners()
        {
            try
            {
                return Ok(_megamillionRepository.ShowMegamillionWinners());
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get winning pairs: {e}");
                return null;
            }
        }

        [HttpGet]
        [Route("/api/megamillion/GetMegamillionDetails")]
        public IActionResult GetMegamillionDetails()
        {
            try
            {
                _megamillionRepository.GetMegamillionDetails();

                if (_megamillionRepository.SaveAll())
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
                _logger.LogError($"Failed to get Megamillion Details: {e}");
                return null;
            }
        }

        [HttpPost]
        [Route("/api/megamillion/AddUserPicks")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post([FromBody] IEnumerable<UserPick> picks)
        {
            try
            {
                _megamillionRepository.AddUserPicks(picks);
                if (_megamillionRepository.SaveAll())
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
    }
}