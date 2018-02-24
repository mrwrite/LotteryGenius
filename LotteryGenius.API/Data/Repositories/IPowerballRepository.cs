using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LotteryGenius.API.Data.Entities;

namespace LotteryGenius.API.Data.Repositories
{
    public interface IPowerballRepository
    {
        IEnumerable<Powerball> GetPowerballs();

        Powerball GetLastPowerball();

        bool SaveAll();
    }
}