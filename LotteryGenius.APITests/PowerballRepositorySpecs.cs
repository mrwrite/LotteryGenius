using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Moq;
using AutoMapper;
using LotteryGenius.API.Controllers;
using LotteryGenius.API.Data;
using LotteryGenius.API.Data.Entities;
using LotteryGenius.API.Data.Repositories;
using LotteryGenius.API.ViewModels;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LotteryGenius.APITests
{
    using LotteryGenius.API.Services;

    using Microsoft.Extensions.Configuration;

    public class PowerballRepositorySpecs
    {
        private Mock<LotteryGeniusContext> mockLotteryContext;

        private Mock<IPowerballRepository> mockPowerballRepository;

        private Mock<ILogger<PowerballController>> mockLogger;

        private Mock<IConfiguration> mockConfig;

        private Mock<IMapper> mockMapper;

        private Mock<IEmailSender> mockEmailSender;

        public PowerballRepositorySpecs()
        {
            this.mockLotteryContext = new Mock<LotteryGeniusContext>();
            this.mockPowerballRepository = new Mock<IPowerballRepository>();
            this.mockLogger = new Mock<ILogger<PowerballController>>();
            this.mockConfig = new Mock<IConfiguration>();
            this.mockMapper = new Mock<IMapper>();
            this.mockEmailSender = new Mock<IEmailSender>();

            var powerballs = new List<Powerball>()
                                             {
                                                 new Powerball()
                                                     {
                                                         id = 1,
                                                         ball1 = "01",
                                                         ball2 = "02",
                                                         ball3 = "03",
                                                         ball4 = "04",
                                                         ball5 = "05",
                                                         powerball = "06",
                                                         powerplay = "1X",
                                                         jackpot = "$40,000,000",
                                                         draw_date = DateTime.Now.AddDays(-21)
                                                     },
                                                 new Powerball()
                                                     {
                                                         id = 2,
                                                         ball1 = "07",
                                                         ball2 = "08",
                                                         ball3 = "09",
                                                         ball4 = "10",
                                                         ball5 = "11",
                                                         powerball = "12",
                                                         powerplay = "2X",
                                                         jackpot = "$70,000,000",
                                                         draw_date = DateTime.Now.AddDays(-14)
                                                     },
                                                 new Powerball()
                                                     {
                                                         id = 3,
                                                         ball1 = "13",
                                                         ball2 = "14",
                                                         ball3 = "15",
                                                         ball4 = "16",
                                                         ball5 = "17",
                                                         powerball = "18",
                                                         powerplay = "3X",
                                                         jackpot = "$100,000,000",
                                                         draw_date = DateTime.Now.AddDays(-7)
                                                     }
                                             };
        }

        [Fact]
        public async Task test_repository_get_powerballs()
        {
        }
    }
}