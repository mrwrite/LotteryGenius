using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using LotteryGenius.API.Data.Entities;
using LotteryGenius.API.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Protocols;
using HtmlAgilityPack;

namespace LotteryGenius.API.Data.Repositories
{
    public class PowerballRepository : IPowerballRepository
    {
        private readonly LotteryGeniusContext _ctx;
        private readonly ILogger<PowerballRepository> _logger;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private SqlConnection sqlConnection;

        public PowerballRepository(LotteryGeniusContext ctx, ILogger<PowerballRepository> logger, IConfiguration config, IMapper mapper)
        {
            _ctx = ctx;
            _logger = logger;
            _config = config;
            _mapper = mapper;

            sqlConnection = new SqlConnection(_config.GetConnectionString("LotteryGeniusConnectionString"));
        }

        public IEnumerable<Powerball> GetPowerballs()
        {
            try
            {
                return _ctx.Powerballs
                    .OrderByDescending(p => p.draw_date)
                    .ToList();
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get Powerball Numbers: {e}");
                return null;
            }
        }

        public Powerball GetLastPowerball()
        {
            try
            {
                return _ctx.Powerballs
                    .OrderByDescending(p => p.draw_date)
                    .FirstOrDefault();
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get latest Powerball number: {e}");
                return null;
            }
        }

        public void AddPowerballNumber(Powerball number)
        {
            number.created_on = DateTime.Now;
            number.modified_on = DateTime.Now;
            number.powerball = number.powerball.Trim();
            number.powerplay = number.powerplay.Trim();
            number.jackpot = number.jackpot.Trim();

            _ctx.Powerballs.Add(number);
        }

        public IEnumerable<PowerPicksViewModel> GetPowerballPicks()
        {
            try
            {
                using (IDbConnection dbConnection = sqlConnection)
                {
                    dbConnection.Open();
                    var picks = dbConnection.QueryMultiple("dbo.GetPowerballPicks", commandType: CommandType.StoredProcedure);
                    var results = picks.Read<PowerPicksViewModel>().ToList();
                    foreach (var pick in results)
                    {
                        PowerballPicks newPick = new PowerballPicks()
                        {
                            ball1 = pick.ball1,
                            ball2 = pick.ball2,
                            ball3 = pick.ball3,
                            ball4 = pick.ball4,
                            ball5 = pick.ball5,
                            powerball = pick.powerball,
                            powerplay = pick.powerplay,
                            pick_date = DateTime.Now
                        };

                        _ctx.PowerPicks.Add(newPick);
                    }

                    SaveAll();
                    return results;
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get Powerball Picks: {e}");
                return null;
            }
        }

        public IEnumerable<PowerballPicks> GetAllPowerballPicks()
        {
            try
            {
                return _ctx.PowerPicks
                     .ToList();
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get all Picks");
                return null;
            }
        }

        public IEnumerable<PowerballWinners> GetPowerBallWinners()
        {
            try
            {
                using (IDbConnection dbConnection = sqlConnection)
                {
                    dbConnection.Open();
                    var winners = dbConnection.QueryMultiple("dbo.GetPowerballWinners",
                        commandType: CommandType.StoredProcedure, commandTimeout: 360);
                    var results = winners.Read<PowerballWinners>().ToList();
                    AddPowerPickWinners(results);
                    return results;
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get PowerballWinners: {e}");
                return null;
            }
        }

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }

        public void AddPowerPickWinners(IEnumerable<PowerballWinners> winners)
        {
            DynamicParameters param = new DynamicParameters();

            foreach (var winner in winners)
            {
                List<string> numbers = new List<string>();
                List<string> winningNumber = new List<string>();
                int p = 0;

                param.Add("@powerId", winner.powerball_id);
                param.Add("@pickId", winner.pick_id);
                param.Add("@ball1", winner.ball1);
                param.Add("@ball2", winner.ball2);
                param.Add("@ball3", winner.ball3);
                param.Add("@ball4", winner.ball4);
                param.Add("@ball5", winner.ball5);
                param.Add("@powerball", winner.powerball);
                param.Add("@powerplay", winner.powerplay);
                param.Add("@pick_date", winner.pick_date);

                winningNumber.Add(winner.ball1);
                winningNumber.Add(winner.ball2);
                winningNumber.Add(winner.ball3);
                winningNumber.Add(winner.ball4);
                winningNumber.Add(winner.ball5);

                var powerNumber = _ctx.Powerballs.SingleOrDefault(x => x.id == winner.powerball_id);

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
                        if (powerNumber.powerball == winner.powerball)
                        {
                            param.Add("@prizeId", 3);
                        }
                        else
                        {
                            param.Add("@prizeId", 2);
                        }
                        break;

                    case 3:
                        if (powerNumber.powerball == winner.powerball)
                        {
                            param.Add("@prizeId", 1);
                        }
                        break;

                    default:
                        param.Add("@prizeId", null);
                        break;
                }

                sqlConnection = new SqlConnection(_config.GetConnectionString("LotteryGeniusConnectionString"));

                using (IDbConnection dbConnection = sqlConnection)
                {
                    dbConnection.Execute("dbo.AddPowerWinners", param, commandType: CommandType.StoredProcedure);
                    SaveAll();
                    numbers.Clear();
                    winningNumber.Clear();
                }
            }
        }

        public IEnumerable<PowerWinnerViewModel> ShowPowerballWinners()
        {
            try
            {
                using (IDbConnection dbConnection = sqlConnection)
                {
                    dbConnection.Open();
                    var results = dbConnection.Query<PowerWinnerViewModel>(
                        "select distinct p.id, p.ball1, p.ball2, p.ball3, p.ball4, p.ball5, p.powerball, p.powerplay, p.draw_date" +
                        " from dbo.powerballs p " +
                        "inner join dbo.PowerWinners pw " +
                        "on p.id = pw.powerball_id"
                    );

                    foreach (var result in results)
                    {
                        result.picks = dbConnection.Query<PowerballWinners>(
                            "select pw.*,pp.prize as prize_amount from dbo.PowerWinners pw" +
                            " inner join dbo.PowerballPrize pp" +
                            " on pp.Id = pw.prize_id" +
                            " where pw.powerball_id = @id", new { id = result.id }
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

        public NextPowerball GetNextPowerballJackpot()
        {
            try
            {
                return _ctx.NextPowerball
                     .OrderByDescending(p => p.next_jackpot_date)
                     .FirstOrDefault();
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get Next Powerball: {e}");
                return null;
            }
        }

        public void GetPowerballDetails()
        {
            var powerUrl = "http://www.lotteryusa.com/powerball";

            HtmlWeb powerWeb = new HtmlWeb();
            HtmlDocument powerDoc = powerWeb.Load(powerUrl);

            IEnumerable<string> powerList =
                powerDoc.DocumentNode.SelectNodes(@"//ul[@class='draw-result list-unstyled list-inline']/li")
                    .Select(li => li.InnerText);
            var powerDate = powerDoc.DocumentNode.SelectSingleNode(@"//span[@class='date']/time");
            var pDate = powerDate.Attributes["datetime"].Value;
            var powerJackpot = powerDoc.DocumentNode.SelectSingleNode(@"//span[@class='jackpot-amount']").InnerText;
            var pNextJackpot = powerDoc.DocumentNode.SelectSingleNode(@"//span[@class='next-jackpot-amount']")
                .FirstChild.InnerText;
            var pNextJackpotDate = powerDoc.DocumentNode.SelectSingleNode(@"//span[@class='next-draw-date']").InnerText;

            foreach (string powerItem in powerList)
            {
                Console.WriteLine(powerItem);
            }
            Console.WriteLine(pDate.ToString());
            Console.WriteLine(powerJackpot);
            Powerball pBall = new Powerball()
            {
                ball1 = powerList.ElementAt(0).PadLeft(2, '0'),
                ball2 = powerList.ElementAt(1).PadLeft(2, '0'),
                ball3 = powerList.ElementAt(2).PadLeft(2, '0'),
                ball4 = powerList.ElementAt(3).PadLeft(2, '0'),
                ball5 = powerList.ElementAt(4).PadLeft(2, '0'),
                powerball = powerList.ElementAt(5).Replace(" PB", "").PadLeft(2, '0'),
                powerplay = powerList.ElementAt(6).Replace("Power Play: ", "").PadRight(2, 'X'),
                draw_date = Convert.ToDateTime(pDate),
                jackpot = powerJackpot
            };

            AddPowerballNumber(pBall);
            AddNextPowerballJackpot(pNextJackpot, Convert.ToDateTime(pNextJackpotDate));
        }

        public void AddUserPicks(IEnumerable<UserPick> picks)
        {
            foreach (var userPick in picks)
            {
                userPick.saved_date = DateTime.Now;
            }

            _ctx.UserPicks.AddRange(picks);
        }

        public void AddNextPowerballJackpot(string jackpot, DateTime jackpot_date)
        {
            DynamicParameters param = new DynamicParameters();

            param.Add("@next_jackpot", jackpot);
            param.Add("@next_jackpot_date", jackpot_date);

            using (IDbConnection dbConnection = sqlConnection)
            {
                dbConnection.Execute("UpsertNextPowerball", param, commandType: CommandType.StoredProcedure);
            }
        }
    }
}