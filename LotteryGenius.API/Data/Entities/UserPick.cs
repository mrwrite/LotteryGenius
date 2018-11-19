using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.API.Data.Entities
{
    public class UserPick
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public string game_type { get; set; }
        public int? lotto_id { get; set; }
        public string ball1 { get; set; }
        public string ball2 { get; set; }
        public string ball3 { get; set; }
        public string ball4 { get; set; }
        public string ball5 { get; set; }
        public string lottoball { get; set; }
        public DateTime? saved_date { get; set; }
        public int? pick_id { get; set; }
    }
}