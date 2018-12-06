using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.Web.Repositories
{
    using System.Net.Http;
    using System.Net.Http.Headers;

    using LotteryGenius.Web.Models;
    using LotteryGenius.Web.ViewModels;

    using Microsoft.Extensions.Configuration;

    public class MegamillionRepository : IMegamillionRepository
    {
        private readonly IConfiguration configuration;

        public MegamillionRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<Megamillion> GetLastMegamillion()
        {
            Megamillion megamillion = null;
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(this.configuration.GetSection("BaseUrl").Value);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = await client.GetAsync("/api/megamillion/GetLatestMegamillion");

            if (response.IsSuccessStatusCode)
            {
                megamillion = await response.Content.ReadAsAsync<Megamillion>();

                return megamillion;
            }

            return null;
        }

        public async Task<NextMegamillion> GetNextMegamillion()
        {
            NextMegamillion nextMegamillion = null;
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(this.configuration.GetSection("BaseUrl").Value);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = await client.GetAsync("/api/megamillion/GetNextMegamillion");

            if (response.IsSuccessStatusCode)
            {
                nextMegamillion = await response.Content.ReadAsAsync<NextMegamillion>();
                return nextMegamillion;
            }

            return null;
        }

        public async Task<List<MegaPicksViewModel>> GetMegamillionPicks()
        {
            List<MegaPicksViewModel> megaPicks = null;
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(this.configuration.GetSection("BaseUrl").Value);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync("/api/megamillion/MegamillionPicks").Result;

            if (response.IsSuccessStatusCode)
            {
                megaPicks = await response.Content.ReadAsAsync<List<MegaPicksViewModel>>();

                return megaPicks;
            }

            return null;
        }

        public async Task<List<MegaWinnerViewModel>> ShowMegamillionWinners()
        {
            List<MegaWinnerViewModel> megaWinners = null;
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(this.configuration.GetSection("BaseUrl").Value);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync("/api/megamillion/ShowMegamillionWinners").Result;

            if (response.IsSuccessStatusCode)
            {
                megaWinners = await response.Content.ReadAsAsync<List<MegaWinnerViewModel>>();
                return megaWinners;
            }

            return null;
        }

        public string checkWinner(string ball, MegaWinnerViewModel winner, string type)
        {
            List<string> vWinners = new List<string>();
            vWinners.Add(winner.ball1);
            vWinners.Add(winner.ball2);
            vWinners.Add(winner.ball3);
            vWinners.Add(winner.ball4);
            vWinners.Add(winner.ball5);
            vWinners.Add(winner.megaball);

            if (vWinners.IndexOf(ball) > -1)
            {
                return "mini-correct-circle";
            }
            else
            {
                if (type == "powerball")
                {
                    return "mini-powerball-circle";
                }
                else if (type == "megaball")
                {
                    return "mini-megamillions-circle";
                }

                return "mini-circle";
            }
        }
    }
}