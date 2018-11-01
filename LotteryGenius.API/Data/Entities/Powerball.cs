using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ML.Core.Data;
using Microsoft.ML.Runtime.Api;

namespace LotteryGenius.API.Data.Entities
{
    public class Powerball
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
        public string powerball { get; set; }

        [StringLength(2)]
        public string powerplay { get; set; }

        public string jackpot { get; set; }
        public DateTime draw_date { get; set; }
        public DateTime? created_on { get; set; }
        public DateTime? modified_on { get; set; }
    }
}