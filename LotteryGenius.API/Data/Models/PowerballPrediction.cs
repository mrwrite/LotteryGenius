using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ML.Runtime.Api;

namespace LotteryGenius.API.Data.Models
{
    public class PowerballPrediction
    {
        [ColumnName("Ball1")]
        public float Ball1 { get; set; }

        [ColumnName("Ball2")]
        public float Ball2 { get; set; }

        [ColumnName("Ball3")]
        public float Ball3 { get; set; }

        [ColumnName("Ball4")]
        public float Ball4 { get; set; }

        [ColumnName("Ball5")]
        public float Ball5 { get; set; }

        [ColumnName("PowerBall")]
        public float PowerBall { get; set; }
    }
}