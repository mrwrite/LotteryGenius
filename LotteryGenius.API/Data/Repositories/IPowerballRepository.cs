using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LotteryGenius.API.Data.Entities;
using LotteryGenius.API.ViewModels;

namespace LotteryGenius.API.Data.Repositories
{
    public interface IPowerballRepository
    {
        IEnumerable<Powerball> GetPowerballs();

        Powerball GetLastPowerball();

        IEnumerable<PowerPicksViewModel> GetPowerballPicks();

        IEnumerable<PowerballPicks> GetAllPowerballPicks();

        IEnumerable<PowerballWinners> GetPowerBallWinners();

        bool SaveAll();

        void AddPowerPickWinners(IEnumerable<PowerballWinners> winners);

        void AddPowerballNumber(Powerball number);

        IEnumerable<PowerWinnerViewModel> ShowPowerballWinners();

        NextPowerball GetNextPowerballJackpot();

        void GetPowerballDetails();

        void AddUserPicks(IEnumerable<UserPick> picks);

        void AddManualUserPick(UserPick pick);

        IEnumerable<UserPick> GetUserPicks(int user_id);

        IEnumerable<UserPick> GetUserWinningPicks(int user_id);
    }
}