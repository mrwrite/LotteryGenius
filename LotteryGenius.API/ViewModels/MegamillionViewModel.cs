using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.API.ViewModels
{
    public class MegamillionViewModel
    {
        public int MegamillionId { get; set; }
        public string Megamillion1 { get; set; }
        public string Megamillion2 { get; set; }
        public string Megamillion3 { get; set; }
        public string Megamillion4 { get; set; }
        public string Megamillion5 { get; set; }
        public string MegaBall { get; set; }
        public string MegaPlier { get; set; }
        public string MegamillionJackpot { get; set; }
        public DateTime MegamillionDrawDate { get; set; }
    }
}