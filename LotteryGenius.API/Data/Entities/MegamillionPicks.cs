using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.API.Data.Entities
{
    public class MegamillionPicks
    {
        public int id { get; set; }
        public int? megamillion_id { get; set; }

        [StringLength(2)]
        public string ball1 { get; set; }

        [StringLength(2)]
        public string ball2 { get; set; }

        [StringLength(2)]
        public string ball3 { get; set; }

        [StringLength(2)]
        public string ball4 { get; set; }

        [StringLength(2)]
        public string ball5 { get; set; }

        [StringLength(2)]
        public string megaball { get; set; }

        [StringLength(2)]
        public string megaplier { get; set; }

        public bool isPicked { get; set; }

        public DateTime pick_date { get; set; }
    }
}