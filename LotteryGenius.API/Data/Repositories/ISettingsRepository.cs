using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.API.Data.Repositories
{
    using LotteryGenius.API.Data.Entities;

    public interface ISettingsRepository
    {
        void AddPlayer(UserPlayer player);

        void EditPlayer(UserPlayer player);

        UserPlayer GetUserPlayer(int user_id);
    }
}