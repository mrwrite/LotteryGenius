using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LotteryGenius.API.Data.Entities;

namespace LotteryGenius.API.ViewModels
{
    public class PowerWinnerViewModel
    {
        public int id { get; set; }
        public string ball1 { get; set; }
        public string ball2 { get; set; }
        public string ball3 { get; set; }
        public string ball4 { get; set; }
        public string ball5 { get; set; }
        public string powerball { get; set; }
        public string powerplay { get; set; }
        public DateTime draw_date { get; set; }
        public string jackpot { get; set; }
        public IEnumerable<PowerballWinners> picks { get; set; }
    }
}