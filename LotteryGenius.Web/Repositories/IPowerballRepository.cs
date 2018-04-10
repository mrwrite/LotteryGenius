using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using LotteryGenius.Web.Models;
using LotteryGenius.Web.ViewModels;

namespace LotteryGenius.Web.Repositories
{
    public interface IPowerballRepository
    {
        Task<Powerball> GetLastPowerball();

        Task<NextPowerball> GetNextPowerball();

        Task<List<PowerPicksViewModel>> GetPowerballPicks();
    }
}