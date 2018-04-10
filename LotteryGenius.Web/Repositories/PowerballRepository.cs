using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using LotteryGenius.Web.Models;
using LotteryGenius.Web.ViewModels;
using Microsoft.Extensions.Configuration;
using RestSharp;

namespace LotteryGenius.Web.Repositories
{
    public class PowerballRepository : IPowerballRepository
    {
        private readonly IConfiguration _configuration;

        public PowerballRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<Powerball> GetLastPowerball()
        {
            Powerball powerball = null;
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(_configuration.GetSection("BaseUrl").Value);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = await client.GetAsync("/api/powerball/GetLatestPowerball");

            if (response.IsSuccessStatusCode)
            {
                powerball = await response.Content.ReadAsAsync<Powerball>();

                return powerball;
            }

            return null;
        }

        public async Task<NextPowerball> GetNextPowerball()
        {
            NextPowerball nextPowerball = null;
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(_configuration.GetSection("BaseUrl").Value);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = await client.GetAsync("/api/powerball/GetNextPowerball");

            if (response.IsSuccessStatusCode)
            {
                nextPowerball = await response.Content.ReadAsAsync<NextPowerball>();
                return nextPowerball;
            }

            return null;
        }

        public async Task<List<PowerPicksViewModel>> GetPowerballPicks()
        {
            List<PowerPicksViewModel> powerPicks = null;
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(_configuration.GetSection("BaseUrl").Value);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync("/api/powerball/PowerballPicks").Result;

            if (response.IsSuccessStatusCode)
            {
                powerPicks = await response.Content.ReadAsAsync<List<PowerPicksViewModel>>();

                return powerPicks;
            }

            return null;
        }
    }
}