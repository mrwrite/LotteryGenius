using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using HtmlAgilityPack;
using LotteryGenius.API.Data.Entities;
using LotteryGenius.API.ViewModels;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace LotteryGenius.API.Data.Repositories
{
    public class MegamillionRepository : IMegamillionRepository
    {
        private readonly LotteryGeniusContext _ctx;
        private readonly ILogger<MegamillionRepository> _logger;
        private readonly IConfiguration _config;
        private SqlConnection sqlConnection;

        public MegamillionRepository(LotteryGeniusContext ctx, ILogger<MegamillionRepository> logger, IConfiguration config)
        {
            _ctx = ctx;
            _logger = logger;
            _config = config;

            sqlConnection = new SqlConnection(_config.GetConnectionString("LotteryGeniusConnectionString"));
        }

        public IEnumerable<Megamillion> GetMegamillions()
        {
            try
            {
                return _ctx.Megamillions
                    .OrderByDescending(p => p.draw_date)
                    .ToList();
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get Megamillion Numbers: {e}");
                return null;
            }
        }

        public Megamillion GetLastMegamillion()
        {
            try
            {
                return _ctx.Megamillions
                    .OrderByDescending(p => p.draw_date)
                    .FirstOrDefault();
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get latest Megamillion number: {e}");
                return null;
            }
        }

        public IEnumerable<MegaPicksViewModel> GetMegamillionPicks()
        {
            try
            {
                using (IDbConnection dbConnection = sqlConnection)
                {
                    dbConnection.Open();
                    var picks = dbConnection.QueryMultiple("dbo.GetMegamillionPicks", commandType: CommandType.StoredProcedure);
                    var results = picks.Read<MegaPicksViewModel>().ToList();
                    return results;
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get Megamillion Picks: {e}");
                return null;
            }
        }

        public IEnumerable<MegamillionPicks> GetAllMegamillionPicks()
        {
            try
            {
                return _ctx.MegaPicks
                    .ToList();
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get all Picks");
                return null;
            }
        }

        public IEnumerable<MegamillionWinners> GetMegamillionWinners()
        {
            try
            {
                using (IDbConnection dbConnection = sqlConnection)
                {
                    dbConnection.Open();
                    var winners = dbConnection.QueryMultiple("dbo.GetMegamillionWinners",
                        commandType: CommandType.StoredProcedure, commandTimeout: 360);
                    var results = winners.Read<MegamillionWinners>().ToList();
                    AddMegaPickWinners(results);
                    return results;
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get Megamillion Winners: {e}");
                return null;
            }
        }

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }

        public void AddMegaPickWinners(IEnumerable<MegamillionWinners> winners)
        {
            DynamicParameters param = new DynamicParameters();

            foreach (var winner in winners)
            {
                List<string> numbers = new List<string>();
                List<string> winningNumber = new List<string>();
                int p = 0;

                param.Add("@powerId", winner.megamillion_id);
                param.Add("@pickId", winner.pick_id);
                param.Add("@ball1", winner.ball1);
                param.Add("@ball2", winner.ball2);
                param.Add("@ball3", winner.ball3);
                param.Add("@ball4", winner.ball4);
                param.Add("@ball5", winner.ball5);
                param.Add("@powerball", winner.megaball);
                param.Add("@powerplay", winner.megaplier);
                param.Add("@pick_date", winner.pick_date);

                winningNumber.Add(winner.ball1);
                winningNumber.Add(winner.ball2);
                winningNumber.Add(winner.ball3);
                winningNumber.Add(winner.ball4);
                winningNumber.Add(winner.ball5);

                var powerNumber = _ctx.Powerballs.SingleOrDefault(x => x.id == winner.megamillion_id);

                numbers.Add(powerNumber.ball1);
                numbers.Add(powerNumber.ball2);
                numbers.Add(powerNumber.ball3);
                numbers.Add(powerNumber.ball4);
                numbers.Add(powerNumber.ball5);

                foreach (var num in winningNumber)
                {
                    if (numbers.IndexOf(num) != -1)
                    {
                        p++;
                    }
                }

                switch (p)
                {
                    case 5:
                        param.Add("@prizeId", 4);
                        break;

                    case 4:
                        if (powerNumber.powerball == winner.megaball)
                        {
                            param.Add("@prizeId", 3);
                        }
                        else
                        {
                            param.Add("@prizeId", 2);
                        }
                        break;

                    case 3:
                        if (powerNumber.powerball == winner.megaball)
                        {
                            param.Add("@prizeId", 1);
                        }
                        break;

                    default:
                        param.Add("@prizeId", null);
                        break;
                }

                using (IDbConnection dbConnection = sqlConnection)
                {
                    dbConnection.Execute("dbo.AddMegaWinners", param, commandType: CommandType.StoredProcedure);
                    numbers.Clear();
                    winningNumber.Clear();
                }
            }
        }

        public void AddMegamillionNumber(Megamillion number)
        {
            number.created_on = DateTime.Now;
            number.modified_on = DateTime.Now;
            number.megaball = number.megaball.Trim();
            number.megaplier = number.megaplier.Trim();
            number.jackpot = number.jackpot.Trim();

            _ctx.Megamillions.Add(number);
        }

        public IEnumerable<MegaWinnerViewModel> ShowMegamillionWinners()
        {
            try
            {
                using (IDbConnection dbConnection = sqlConnection)
                {
                    dbConnection.Open();
                    var results = dbConnection.Query<MegaWinnerViewModel>(
                        "select distinct m.id, m.ball1, m.ball2, m.ball3, m.ball4, m.ball5, m.megaball, m.megaplier, m.draw_date" +
                        " from dbo.megamillions m " +
                        "inner join dbo.MegaWinners mw " +
                        "on m.id = mw.megamillion_id"
                    );

                    foreach (var result in results)
                    {
                        result.picks = dbConnection.Query<MegamillionWinners>(
                            "select mw.*,mp.prize as prize_amount from dbo.MegaWinners mw" +
                            " inner join dbo.MegamillionPrize mp" +
                            " on mp.Id = mw.prize_id" +
                            " where mw.megamillion_id = @id", new { id = result.id }
                        );
                    }

                    return results;
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get Picked Winners: {e}");
                return null;
            }
        }

        public NextMegamillion GetNextMegamillionJackpot()
        {
            try
            {
                return _ctx.NextMegamillion
                    .OrderByDescending(p => p.next_jackpot_date)
                    .FirstOrDefault();
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get Next Megamillion: {e}");
                return null;
            }
        }

        public void GetMegamillionDetails()
        {
            string megaUrl = "http://www.lotteryusa.com/mega-millions/";

            HtmlWeb megaWeb = new HtmlWeb();
            HtmlDocument megaDoc = megaWeb.Load(megaUrl);

            IEnumerable<string> megaList =
                megaDoc.DocumentNode.SelectNodes(@"//ul[@class='draw-result list-unstyled list-inline']/li")
                    .Select(li => li.InnerText);
            var megaDate = megaDoc.DocumentNode.SelectSingleNode(@"//span[@class='date']/time");
            var mDate = megaDate.Attributes["datetime"].Value;
            var megaJackpot = megaDoc.DocumentNode.SelectSingleNode(@"//span[@class='jackpot-amount']").InnerText;
            var mNextJackpot = megaDoc.DocumentNode.SelectSingleNode(@"//span[@class='next-jackpot-amount']")
                .FirstChild.InnerText;
            var mNextJackpotDate = megaDoc.DocumentNode.SelectSingleNode(@"//span[@class='next-draw-date']").InnerText;

            foreach (string megaItem in megaList)
            {
                Console.WriteLine(megaItem);
            }
            Console.WriteLine(mDate.ToString());
            Console.WriteLine(megaJackpot);
            Megamillion mBall = new Megamillion()
            {
                ball1 = megaList.ElementAt(0).PadLeft(2, '0'),
                ball2 = megaList.ElementAt(1).PadLeft(2, '0'),
                ball3 = megaList.ElementAt(2).PadLeft(2, '0'),
                ball4 = megaList.ElementAt(3).PadLeft(2, '0'),
                ball5 = megaList.ElementAt(4).PadLeft(2, '0'),
                megaball = megaList.ElementAt(5).Replace(" MB", "").PadLeft(2, '0'),
                megaplier = megaList.ElementAt(6).Replace("Megaplier: ", "").PadRight(2, 'X'),
                draw_date = Convert.ToDateTime(mDate),
                jackpot = megaJackpot
            };

            AddMegamillionNumber(mBall);
            AddNextMegamillionsJackpot(mNextJackpot, Convert.ToDateTime(mNextJackpotDate));
        }

        public void AddUserPicks(IEnumerable<UserPick> picks)
        {
            foreach (var userPick in picks)
            {
                userPick.saved_date = DateTime.Now;
            }

            _ctx.UserPicks.AddRange(picks);
        }

        public void AddNextMegamillionsJackpot(string jackpot, DateTime jackpot_date)
        {
            DynamicParameters param = new DynamicParameters();

            param.Add("@next_jackpot", jackpot);
            param.Add("@next_jackpot_date", jackpot_date);

            using (IDbConnection dbConnection = sqlConnection)
            {
                dbConnection.Execute("UpsertNextMegamillions", param, commandType: CommandType.StoredProcedure);
            }
        }
    }
}