﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.API.Data.Entities
{
    public class Megamillion
    {
        public int id { get; set; }

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

        public string jackpot { get; set; }
        public DateTime draw_date { get; set; }
        public DateTime? created_on { get; set; }
        public DateTime? modified_on { get; set; }
    }
}