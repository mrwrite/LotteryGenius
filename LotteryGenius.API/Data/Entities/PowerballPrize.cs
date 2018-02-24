using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.API.Data.Entities
{
    public class PowerballPrize
    {
        public int id { get; set; }
        public decimal prize { get; set; }
        public string description { get; set; }
    }
}