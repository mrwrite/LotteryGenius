using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ML.Core.Data;
using Microsoft.ML.Runtime.Api;

namespace LotteryGenius.API.Data.Models
{
    public class PowerballData
    {
        [Column("0")]
        public int id { get; set; }

        [Column("1")]
        public float Ball1 { get; set; }

        [Column("2")]
        public float Ball2 { get; set; }

        [Column("3")]
        public float Ball3 { get; set; }

        [Column("4")]
        public float Ball4 { get; set; }

        [Column("5")]
        public float Ball5 { get; set; }

        [Column("6")]
        public float PowerBall { get; set; }

        [Column("7")]
        public float daysAgo { get; set; }
    }
}