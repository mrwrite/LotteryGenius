﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Moq;

namespace LotteryGenius.APITests
{
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

    public class PowerballSpecs
    {
        private new Mock<LotteryGeniusContext> mockLotteryContext;

        [Fact]
        public async Task Get_All_Powerballs()
        {
            var mockPowerballRepository = new Mock<IPowerballRepository>();
            var mockLoggerRepository = new Mock<ILogger<PowerballController>>();
            var mockMapperRepository = new Mock<IMapper>();
            this.mockLotteryContext = new Mock<LotteryGeniusContext>();

            List<Powerball> powerballs = new List<Powerball>()
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

            mockPowerballRepository.Setup(x => x.GetPowerballs()).Returns(powerballs);

            PowerballController powerball = new PowerballController(mockPowerballRepository.Object, mockLoggerRepository.Object, mockMapperRepository.Object, this.mockLotteryContext.Object);
            var results = await powerball.Get();
            var okObjectResult = results as OkObjectResult;

            //assert
            Assert.NotNull(okObjectResult);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async Task get_the_latest_powerball()
        {
            var mockPowerballRepository = new Mock<IPowerballRepository>();
            var mockLoggerRepository = new Mock<ILogger<PowerballController>>();
            var mockMapperRepository = new Mock<IMapper>();
            this.mockLotteryContext = new Mock<LotteryGeniusContext>();
            PowerballController powerball = new PowerballController(mockPowerballRepository.Object, mockLoggerRepository.Object, mockMapperRepository.Object, this.mockLotteryContext.Object);
            var results = await powerball.GetLatestPowerball();
            var okObjectResult = results as OkObjectResult;

            //assert
            Assert.NotNull(okObjectResult);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async Task get_next_powerball()
        {
            var mockPowerballRepository = new Mock<IPowerballRepository>();
            var mockLoggerRepository = new Mock<ILogger<PowerballController>>();
            var mockMapperRepository = new Mock<IMapper>();
            this.mockLotteryContext = new Mock<LotteryGeniusContext>();
            PowerballController powerball = new PowerballController(mockPowerballRepository.Object, mockLoggerRepository.Object, mockMapperRepository.Object, this.mockLotteryContext.Object);
            var results = await powerball.GetNextPowerball();
            var okObjectResult = results as OkObjectResult;

            //assert
            Assert.NotNull(okObjectResult);
            Assert.Equal(200, okObjectResult.StatusCode);
        }
    }
}