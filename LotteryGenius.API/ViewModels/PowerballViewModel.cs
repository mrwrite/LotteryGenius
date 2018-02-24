using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.API.ViewModels
{
    public class PowerballViewModel
    {
        public int PowerballId { get; set; }
        public string Powerball1 { get; set; }
        public string Powerball2 { get; set; }
        public string Powerball3 { get; set; }
        public string Powerball4 { get; set; }
        public string Powerball5 { get; set; }
        public string PowerBall { get; set; }
        public string PowerPlay { get; set; }
        public string PowerballJackpot { get; set; }
        public DateTime PowerballDrawDate { get; set; }
    }
}