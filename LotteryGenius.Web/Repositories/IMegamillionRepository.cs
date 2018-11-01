using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.Web.Repositories
{
    using LotteryGenius.Web.Models;
    using LotteryGenius.Web.ViewModels;

    public interface IMegamillionRepository
    {
        Task<Megamillion> GetLastMegamillion();

        Task<NextMegamillion> GetNextMegamillion();

        Task<List<MegaPicksViewModel>> GetMegamillionPicks();
    }
}