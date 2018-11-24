using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.API.Data.Entities
{
    public class UserPlayer
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public int player_id { get; set; }
        public DateTime created_on { get; set; }
        public DateTime modified_on { get; set; }
    }
}