using System;
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

            var powerballs = new List<Powerball>()
                                {
                                    new Powerball() { ball1 = "01", ball2 = "02", ball3 = "03", ball4 = "04", ball5 = "05", powerball = "06", powerplay = "1X", jackpot = "40,000,000", draw_date = DateTime.Now.AddDays(-3), id = -1, modified_on = DateTime.Now, created_on = DateTime.Now },
                                    new Powerball() { ball1 = "07", ball2 = "08", ball3 = "09", ball4 = "10", ball5 = "11", powerball = "12", powerplay = "2X", jackpot = "80,000,000", draw_date = DateTime.Now.AddDays(-2), id = -2, modified_on = DateTime.Now, created_on = DateTime.Now },
                                    new Powerball() { ball1 = "13", ball2 = "14", ball3 = "15", ball4 = "16", ball5 = "17", powerball = "18", powerplay = "3X", jackpot = "120,000,000", draw_date = DateTime.Now.AddDays(-1), id = -3, modified_on = DateTime.Now, created_on = DateTime.Now }
                                };

            mockPowerballRepository.Setup(p => p.GetPowerballs()).Returns(powerballs);
            PowerballController powerball = new PowerballController(mockPowerballRepository.Object, mockLoggerRepository.Object, mockMapperRepository.Object, this.mockLotteryContext.Object);
            var results = await powerball.Get();
            var okObjectResult = results as OkObjectResult;
            Assert.NotNull(okObjectResult);
            var numbers = okObjectResult.Value as IEnumerable<PowerballViewModel>;
            Assert.Equal(numbers.Count(), powerballs.Count);
        }
    }
}