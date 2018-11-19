using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.API.ViewModels
{
    public class MegaPicksViewModel
    {
        public string ball1 { get; set; }

        public string ball2 { get; set; }

        public string ball3 { get; set; }

        public string ball4 { get; set; }

        public string ball5 { get; set; }

        public string megaball { get; set; }

        public string megaplier { get; set; }

        public bool isPicked { get; set; }

        public DateTime pick_date { get; set; }

        public int id { get; set; }
    }
}