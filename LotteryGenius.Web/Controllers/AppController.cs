using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LotteryGenius.Web.Controllers
{
    public class AppController : Controller
    {
        public IActionResult Login()
        {
            return this.View();
        }
    }
}