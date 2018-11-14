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
using LotteryGenius.API.Data.Models;
using LotteryGenius.API.Services;
using Microsoft.ML.Legacy;
using Microsoft.ML.Legacy.Data;
using Microsoft.ML.Legacy.Trainers;
using Microsoft.ML.Legacy.Transforms;

namespace LotteryGenius.API.Data.Repositories
{
    using Microsoft.ML.Legacy.Models;

    public class PowerballRepository : IPowerballRepository
    {
        private readonly LotteryGeniusContext _ctx;
        private readonly ILogger<PowerballRepository> _logger;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private SqlConnection sqlConnection;

        public PowerballRepository(LotteryGeniusContext ctx, ILogger<PowerballRepository> logger, IConfiguration config, IMapper mapper, IEmailSender emailSender)
        {
            _ctx = ctx;
            _logger = logger;
            _config = config;
            _mapper = mapper;
            _emailSender = emailSender;

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

        public async void AddPowerballNumber(Powerball number)
        {
            number.created_on = DateTime.Now;
            number.modified_on = DateTime.Now;
            number.powerball = number.powerball.Trim();
            number.powerplay = number.powerplay.Trim();
            number.jackpot = number.jackpot.Trim();

            var latestPowerball = _ctx.Powerballs.LastOrDefault();

            if (latestPowerball != null)
            {
                if (number.draw_date > latestPowerball.draw_date)
                {
                    _ctx.Powerballs.Add(number);

                    var htmlEmail =
                        $"A new Powerball Number has been drawn: {number.ball1} - {number.ball2} - {number.ball3} - {number.ball4} - {number.ball5} Powerball: {number.powerball} Powerplay: {number.powerplay}";
                    await _emailSender.SendEmailAsync("aqwright@gmail.com", "New Powerball Draw", htmlEmail);
                }
            }
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

                        var existingPick = this._ctx.PowerPicks.FirstOrDefault(
                            x => x.ball1 == newPick.ball1 && x.ball2 == newPick.ball2 && x.ball3 == newPick.ball3
                                 && x.ball4 == newPick.ball4 && x.ball5 == newPick.ball5
                                 && x.powerball == newPick.powerball);

                        if (existingPick == null)
                        {
                            _ctx.PowerPicks.Add(newPick);
                        }
                    }

                    //var predictedPick = PredictPowerball();

                    //var extraPick = new PowerballPicks
                    //{
                    //    ball1 = predictedPick.Ball1.ToString().PadLeft(2, '0'),
                    //    ball2 = predictedPick.Ball2.ToString().PadLeft(2, '0'),
                    //    ball3 = predictedPick.Ball3.ToString().PadLeft(2, '0'),
                    //    ball4 = predictedPick.Ball4.ToString().PadLeft(2, '0'),
                    //    ball5 = predictedPick.Ball5.ToString().PadLeft(2, '0'),
                    //    powerball = predictedPick.PowerBall.ToString().PadLeft(2, '0'),
                    //    powerplay = "0X",
                    //    pick_date = DateTime.Now
                    //};

                    //var resultView = new PowerPicksViewModel
                    //{
                    //    ball1 = extraPick.ball1,
                    //    ball2 = extraPick.ball2,
                    //    ball3 = extraPick.ball3,
                    //    ball4 = extraPick.ball4,
                    //    ball5 = extraPick.ball5,
                    //    powerball = extraPick.powerball,
                    //    powerplay = extraPick.powerplay
                    //};
                    //_ctx.PowerPicks.Add(extraPick);
                    //results.Add(resultView);

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
                return _ctx.PowerPicks.OrderByDescending(p => p.pick_date)
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
                        if (powerNumber.powerball == winner.powerball)
                        {
                            param.Add("@prizeId", 5);
                        }
                        else
                        {
                            param.Add("@prizeId", 4);
                        }

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
                        "select distinct p.id, p.ball1, p.ball2, p.ball3, p.ball4, p.ball5, p.powerball, p.powerplay, p.draw_date, p.jackpot" +
                        " from dbo.powerballs p " +
                        "inner join dbo.PowerWinners pw " +
                        "on p.id = pw.powerball_id " +
                        "order by p.draw_date desc"
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
                powerball = powerList.ElementAt(5).Replace(" PB", "").TrimEnd().PadLeft(2, '0'),
                powerplay = powerList.ElementAt(6).Replace("Power Play: ", "").PadRight(2, 'X'),
                draw_date = Convert.ToDateTime(pDate),
                jackpot = powerJackpot
            };

            AddPowerballNumber(pBall);
            UpdatePowerPrizeJackpot(pBall.jackpot);
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

            jackpot_date = jackpot_date.AddHours(23);

            param.Add("@next_jackpot", jackpot);
            param.Add("@next_jackpot_date", jackpot_date);

            using (IDbConnection dbConnection = sqlConnection)
            {
                dbConnection.Execute("UpsertNextPowerball", param, commandType: CommandType.StoredProcedure);
            }
        }

        public void UpdatePowerPrizeJackpot(string amount)
        {
            if (amount != null)
            {
                var jackpotPrize = _ctx.PowerballPrize.Find(5);
                if (jackpotPrize != null)
                {
                    var newAmount = Convert.ToDecimal(amount.Replace("$", string.Empty).Replace(",", string.Empty));
                    jackpotPrize.prize = newAmount;
                }
            }
        }

        public PowerballPrediction PredictPowerball()
        {
            var pipeline = new LearningPipeline();
            var allPicks = _ctx.Powerballs;
            var data = new List<PowerballData>();

            foreach (var powerball in allPicks)
            {
                var ts = powerball.draw_date - DateTime.Now;

                var newPick = new PowerballData()
                {
                    Ball1 = Convert.ToInt32(powerball.ball1),
                    Ball2 = Convert.ToInt32(powerball.ball2),
                    Ball3 = Convert.ToInt32(powerball.ball3),
                    Ball4 = Convert.ToInt32(powerball.ball4),
                    Ball5 = Convert.ToInt32(powerball.ball5),
                    PowerBall = Convert.ToInt32(powerball.powerball),
                    daysAgo = (float)ts.TotalDays
                };

                data.Add(newPick);
            }

            var collection = CollectionDataSource.Create(data);
            pipeline.Add(collection);
            pipeline.Add(new ColumnCopier(("daysAgo", "Label")));
            pipeline.Add(new CategoricalOneHotVectorizer("id"));
            pipeline.Add(new ColumnConcatenator("Features", "id", "daysAgo"));
            pipeline.Add(new FastTreeRegressor());

            var model = pipeline.Train<PowerballData, PowerballPrediction>();

            var eval = new RegressionEvaluator();
            RegressionMetrics metrics = eval.Evaluate(model, collection);

            Console.WriteLine($"Rms = {metrics.Rms}");
            Console.WriteLine($"RSquared = {metrics.RSquared}");

            var nextPowerball = _ctx.NextPowerball.FirstOrDefault();

            var predictedDays = (nextPowerball.next_jackpot_date.AddDays(1)) - DateTime.Now;

            var prediction = model.Predict(new PowerballData() { Ball1 = 0, Ball2 = 0, Ball3 = 0, Ball4 = 0, Ball5 = 0, PowerBall = 0, daysAgo = predictedDays.Days });

            return prediction;
        }
    }
}