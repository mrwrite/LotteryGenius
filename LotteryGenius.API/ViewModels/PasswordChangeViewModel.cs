using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.API.ViewModels
{
    public class PasswordChangeViewModel
    {
        public string email { get; set; }
        public string old_password { get; set; }
        public string confirm_password { get; set; }
        public string new_password { get; set; }
    }
}