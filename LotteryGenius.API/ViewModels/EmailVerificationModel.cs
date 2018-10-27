using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.API.ViewModels
{
    public class EmailVerificationModel
    {
        [Required]
        public string Username { get; set; }
    }
}