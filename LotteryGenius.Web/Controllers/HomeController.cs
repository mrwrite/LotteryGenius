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
    public class HomeController : Controller
    {
        private readonly IPowerballRepository _powerballRepository;

        public HomeController(IPowerballRepository powerballRepository)
        {
            _powerballRepository = powerballRepository;
        }

        public async Task<IActionResult> Index()
        {
            var latestPowerball = await _powerballRepository.GetLastPowerball();
            var powerPicks = await _powerballRepository.GetPowerballPicks();
            var nextPowerball = await _powerballRepository.GetNextPowerball();
            ViewData["NextPowerball"] = nextPowerball;
            ViewData["PowerPicks"] = powerPicks;

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
    }
}