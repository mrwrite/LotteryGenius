using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.Web.Models
{
    public class NextPowerball
    {
        public int id { get; set; }
        public DateTime next_jackpot_date { get; set; }
        public string next_jackpot { get; set; }
        public DateTime modified_on { get; set; }
    }
}