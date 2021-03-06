﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LotteryGenius.API.Data.Entities;
using LotteryGenius.API.ViewModels;

namespace LotteryGenius.API.Data.Repositories
{
    public interface IMegamillionRepository
    {
        IEnumerable<Megamillion> GetMegamillions();

        Megamillion GetLastMegamillion();

        IEnumerable<MegaPicksViewModel> GetMegamillionPicks();

        IEnumerable<MegamillionPicks> GetAllMegamillionPicks();

        IEnumerable<MegamillionWinners> GetMegamillionWinners();

        bool SaveAll();

        void AddMegaPickWinners(IEnumerable<MegamillionWinners> winners);

        void AddMegamillionNumber(Megamillion number);

        IEnumerable<MegaWinnerViewModel> ShowMegamillionWinners();

        NextMegamillion GetNextMegamillionJackpot();

        void GetMegamillionDetails();

        void AddUserPicks(IEnumerable<UserPick> picks);

        void AddManualUserPick(UserPick pick);

        IEnumerable<UserPick> GetUserPicks(int user_id);

        IEnumerable<UserPick> GetUserWinningPicks(int user_id);

        IEnumerable<MegaWinnerViewModel> GetUserMegamillionWinners(int user_id);

        bool DeleteUserPick(int id);

        void SendUserPicks(IEnumerable<UserPick> picks);
    }
}