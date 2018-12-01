using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LotteryGenius.Web.Models;
using LotteryGenius.Web.Repositories;

namespace LotteryGenius.Web.Controllers
{
    using System.Net.Http;
    using System.Net.Http.Headers;

    using Microsoft.Extensions.Configuration;

    using Newtonsoft.Json;

    public class HomeController : Controller
    {
        private readonly IPowerballRepository _powerballRepository;

        private readonly IMegamillionRepository megamillionRepository;
        private readonly IConfiguration configuration;

        public HomeController(IPowerballRepository powerballRepository, IMegamillionRepository megamillionRepository, IConfiguration configuration)
        {
            _powerballRepository = powerballRepository;
            this.megamillionRepository = megamillionRepository;
            this.configuration = configuration;
        }

        public async Task<IActionResult> Index()
        {
            var latestPowerball = await _powerballRepository.GetLastPowerball();
            var powerPicks = await _powerballRepository.GetPowerballPicks();
            var nextPowerball = await _powerballRepository.GetNextPowerball();
            ViewData["NextPowerball"] = nextPowerball;
            ViewData["PowerPicks"] = powerPicks;

            var latestMegamillion = await this.megamillionRepository.GetLastMegamillion();
            var megaPicks = await this.megamillionRepository.GetMegamillionPicks();
            var nextMegamillion = await this.megamillionRepository.GetNextMegamillion();
            ViewData["NextMegamillion"] = nextMegamillion;
            ViewData["MegaPicks"] = megaPicks;
            ViewData["LatestMegamillion"] = latestMegamillion;

            return View(latestPowerball);
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public async Task<IActionResult> Powerball()
        {
            var powerWinnerDetails = await _powerballRepository.ShowPowerballWinners();
            float winnerTotalAmount = 0;
            float winnerPowerplayAmount = 0;

            foreach (var winner in powerWinnerDetails)
            {
                foreach (var pick in winner.picks)
                {
                    winnerTotalAmount += pick.prize_amount;

                    if (pick.prize_id == 4)
                    {
                        winnerPowerplayAmount += (pick.prize_amount * 2);
                    }
                    else
                    {
                        winnerPowerplayAmount += (pick.prize_amount * int.Parse(winner.powerplay.Substring(0, 1)));
                    }
                }
            }

            ViewData["winnerTotal"] = winnerTotalAmount;
            ViewData["PowerplayTotal"] = winnerPowerplayAmount;

            ViewData["PowerWinnerDetails"] = powerWinnerDetails;

            return View();
        }

        public async Task<IActionResult> Megamillions()
        {
            var megaWinnerDetails = await this.megamillionRepository.ShowMegamillionWinners();
            float winnerTotalAmount = 0;
            float winnerMegaplierAmmount = 0;

            foreach (var winner in megaWinnerDetails)
            {
                foreach (var pick in winner.picks)
                {
                    winnerTotalAmount += pick.prize_amount;

                    winnerMegaplierAmmount += (pick.prize_amount * int.Parse(winner.megaplier.Substring(0, 1)));
                }
            }

            ViewData["MegaWinnerDetails"] = megaWinnerDetails;
            ViewData["winnerTotal"] = winnerTotalAmount;
            ViewData["MegaplierTotal"] = winnerMegaplierAmmount;

            return View();
        }

        public async Task<IActionResult> EmailVerification(string email)
        {
            var model = new EmailVerificationModel()
            {
                Username = email
            };

            var _apiUrl = this.configuration["BaseUrl"];
            HttpClient client = new HttpClient();
            var content = JsonConvert.SerializeObject(model);
            var buffer = System.Text.Encoding.UTF8.GetBytes(content);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = await client.PostAsync(_apiUrl + "api/account/VerifyEmail", byteContent);
            if (response.IsSuccessStatusCode)
            {
                return View();
            }

            return View("Index");
        }
    }
}