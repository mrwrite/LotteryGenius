using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using HtmlAgilityPack;
using LotteryGenius.API.Data.Entities;
using LotteryGenius.API.Services;
using LotteryGenius.API.ViewModels;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace LotteryGenius.API.Data.Repositories
{
    public class MegamillionRepository : IMegamillionRepository
    {
        /// <summary>
        /// The _ctx.
        /// </summary>
        private readonly LotteryGeniusContext _ctx;

        private readonly ILogger<MegamillionRepository> _logger;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private SqlConnection sqlConnection;

        public MegamillionRepository(LotteryGeniusContext ctx, ILogger<MegamillionRepository> logger, IConfiguration config, IMapper mapper, IEmailSender emailSender)
        {
            _ctx = ctx;
            _logger = logger;
            _config = config;
            _mapper = mapper;
            _emailSender = emailSender;

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
                    foreach (var pick in results)
                    {
                        MegamillionPicks newPick = new MegamillionPicks()
                        {
                            ball1 = pick.ball1,
                            ball2 = pick.ball2,
                            ball3 = pick.ball3,
                            ball4 = pick.ball4,
                            ball5 = pick.ball5,
                            megaball = pick.megaball,
                            megaplier = pick.megaplier,
                            pick_date = DateTime.Now
                        };

                        var existingPick = this._ctx.MegaPicks.FirstOrDefault(
                            x => x.ball1 == newPick.ball1 && x.ball2 == newPick.ball2 && x.ball3 == newPick.ball3
                                 && x.ball4 == newPick.ball4 && x.ball5 == newPick.ball5
                                 && x.megaball == newPick.megaball);

                        if (existingPick == null)
                        {
                            _ctx.MegaPicks.Add(newPick);
                        }
                    }

                    SaveAll();
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
                return _ctx.MegaPicks.Where(x => x.isPicked != true).OrderByDescending(m => m.pick_date).ToList();
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

                param.Add("@megaId", winner.megamillion_id);
                param.Add("@pickId", winner.pick_id);
                param.Add("@ball1", winner.ball1);
                param.Add("@ball2", winner.ball2);
                param.Add("@ball3", winner.ball3);
                param.Add("@ball4", winner.ball4);
                param.Add("@ball5", winner.ball5);
                param.Add("@megaball", winner.megaball);
                param.Add("@megaplier", winner.megaplier);
                param.Add("@pick_date", winner.pick_date);

                winningNumber.Add(winner.ball1);
                winningNumber.Add(winner.ball2);
                winningNumber.Add(winner.ball3);
                winningNumber.Add(winner.ball4);
                winningNumber.Add(winner.ball5);

                var megaNumber = _ctx.Megamillions.SingleOrDefault(x => x.id == winner.megamillion_id);

                numbers.Add(megaNumber.ball1);
                numbers.Add(megaNumber.ball2);
                numbers.Add(megaNumber.ball3);
                numbers.Add(megaNumber.ball4);
                numbers.Add(megaNumber.ball5);

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
                        if (megaNumber.megaball == winner.megaball)
                        {
                            param.Add("@prizeId", 5);
                        }
                        else
                        {
                            param.Add("@prizeId", 4);
                        }

                        break;

                    case 4:
                        if (megaNumber.megaball == winner.megaball)
                        {
                            param.Add("@prizeId", 3);
                        }
                        else
                        {
                            param.Add("@prizeId", 2);
                        }
                        break;

                    case 3:
                        if (megaNumber.megaball == winner.megaball)
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
                    dbConnection.Execute("AddMegaWinners", param, commandType: CommandType.StoredProcedure);
                    numbers.Clear();
                    winningNumber.Clear();
                }
            }
        }

        public async void AddMegamillionNumber(Megamillion number)
        {
            number.created_on = DateTime.Now;
            number.modified_on = DateTime.Now;
            number.megaball = number.megaball.Trim();
            number.megaplier = number.megaplier.Trim();
            number.jackpot = number.jackpot.Trim();

            var latestMegamillion = _ctx.Megamillions.LastOrDefault();

            if (latestMegamillion != null)
            {
                if (number.draw_date > latestMegamillion.draw_date)
                {
                    _ctx.Megamillions.Add(number);

                    var htmlEmail =
                        $"A new Megamillions Number has been drawn: {number.ball1} - {number.ball2} - {number.ball3} - {number.ball4} - {number.ball5} Megaball: {number.megaball} Megaplier: {number.megaplier}";
                    await _emailSender.SendEmailAsync("aqwright@gmail.com", "New Megamillions Draw", htmlEmail);
                }
            }
        }

        public IEnumerable<MegaWinnerViewModel> ShowMegamillionWinners()
        {
            try
            {
                using (IDbConnection dbConnection = sqlConnection)
                {
                    dbConnection.Open();
                    var results = dbConnection.Query<MegaWinnerViewModel>(
                        "select distinct m.id, m.ball1, m.ball2, m.ball3, m.ball4, m.ball5, m.megaball, m.megaplier, m.draw_date, m.jackpot" +
                        " from dbo.megamillions m " +
                        "inner join dbo.MegaWinners mw " + "on m.id = mw.megamillion_id " +
                        "order by m.draw_date desc");

                    foreach (var result in results)
                    {
                        result.picks = dbConnection.Query<MegamillionWinners>(
                            "select mw.*,mp.prize as prize_amount from dbo.MegaWinners mw" +
                            " inner join dbo.MegamillionPrize mp" +
                            " on mp.Id = mw.prize_id" + " where mw.megamillion_id = @id",
                            new { id = result.id });
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

        /// <summary>
        /// The get next megamillion jackpot.
        /// </summary>
        /// <returns>
        /// The <see cref="NextMegamillion"/>.
        /// </returns>
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
                megaball = megaList.ElementAt(5).Replace(" MB", string.Empty).TrimEnd().PadLeft(2, '0'),
                megaplier = megaList.ElementAt(6).Replace("Megaplier: ", string.Empty).PadRight(2, 'X'),
                draw_date = Convert.ToDateTime(mDate),
                jackpot = megaJackpot
            };

            AddMegamillionNumber(mBall);
            UpdateMegaPrizeJackpot(mBall.jackpot);
            AddNextMegamillionsJackpot(mNextJackpot, Convert.ToDateTime(mNextJackpotDate));
        }

        public void AddUserPicks(IEnumerable<UserPick> picks)
        {
            foreach (var userPick in picks)
            {
                userPick.saved_date = DateTime.Now;
                var megaPick = _ctx.MegaPicks.FirstOrDefault(x => x.id == userPick.pick_id);
                megaPick.isPicked = true;
            }

            _ctx.UserPicks.AddRange(picks);
        }

        public void AddManualUserPick(UserPick pick)
        {
            MegamillionPicks manualPick = new MegamillionPicks()
            {
                ball1 = pick.ball1,
                ball2 = pick.ball2,
                ball3 = pick.ball3,
                ball4 = pick.ball4,
                ball5 = pick.ball5,
                megaball = pick.lottoball,
                pick_date = DateTime.Now,
                megaplier = "0X",
                isPicked = true
            };

            var existingPick = this._ctx.MegaPicks.FirstOrDefault(
                x => x.ball1 == manualPick.ball1 && x.ball2 == manualPick.ball2 && x.ball3 == manualPick.ball3
                     && x.ball4 == manualPick.ball4 && x.ball5 == manualPick.ball5
                     && x.megaball == manualPick.megaball);

            if (existingPick == null)
            {
                this._ctx.MegaPicks.Add(manualPick);

                if (_ctx.SaveChanges() >= 0)
                {
                    pick.pick_id = manualPick.id;
                    pick.saved_date = DateTime.Now;
                    this._ctx.UserPicks.Add(pick);
                }
            }
        }

        public IEnumerable<UserPick> GetUserPicks(int user_id)
        {
            return _ctx.UserPicks.Where(x => x.user_id == user_id && x.game_type == "megamillions")
                .OrderByDescending(p => p.saved_date).ToList();
        }

        public IEnumerable<UserPick> GetUserWinningPicks(int user_id)
        {
            List<UserPick> result = _ctx.UserPicks.Join(
                _ctx.MegaWinners,
                users => users.pick_id,
                winners => winners.pick_id,
                (users, winners) => users).Where(x => x.user_id == user_id).ToList();

            return result;
        }

        public IEnumerable<MegaWinnerViewModel> GetUserMegamillionWinners(int user_id)
        {
            try
            {
                using (IDbConnection dbConnection = sqlConnection)
                {
                    dbConnection.Open();
                    var results = dbConnection.Query<MegaWinnerViewModel>(
                        "select distinct m.id, m.ball1, m.ball2, m.ball3, m.ball4, m.ball5, m.megaball, m.megaplier, m.draw_date, m.jackpot" +
                        " from dbo.Megamillions m " +
                        "inner join dbo.MegaWinners mw " +
                        "on m.id = mw.megamillion_id " +
                        "inner join dbo.UserPicks up " +
                        "on mw.pick_id = up.pick_id " +
                        "where up.user_id = @userId " +
                        "and up.game_type = 'megamillions' " +
                        "order by m.draw_date desc", new { userId = user_id }
                    );

                    foreach (var result in results)
                    {
                        result.picks = dbConnection.Query<MegamillionWinners>(
                            "select mw.*,mp.prize as prize_amount from dbo.MegaWinners mw" +
                            " inner join dbo.MegamillionPrize mp" +
                            " on mp.Id = mw.prize_id" +
                            " inner join dbo.UserPicks up" +
                            " on mw.pick_id = up.pick_id" +
                            " where mw.megamillion_id = @id" +
                            " and up.user_id = @userId", new { id = result.id, userId = user_id }
                        );
                    }

                    return results;
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get User-Picked Winners: {e}");
                return null;
            }
        }

        public bool DeleteUserPick(int id)
        {
            var entry = this._ctx.UserPicks.Find(id);
            if (entry != null)
            {
                var pick = this._ctx.MegaPicks.FirstOrDefault(x => x.id == entry.pick_id);
                pick.isPicked = false;
                this._ctx.UserPicks.Remove(entry);
                return this._ctx.SaveChanges() > 0;
            }
            else
            {
                return false;
            }
        }

        public void AddNextMegamillionsJackpot(string jackpot, DateTime jackpot_date)
        {
            DynamicParameters param = new DynamicParameters();

            jackpot_date = jackpot_date.AddHours(23);

            param.Add("@next_jackpot", jackpot);
            param.Add("@next_jackpot_date", jackpot_date);

            using (IDbConnection dbConnection = sqlConnection)
            {
                dbConnection.Execute("UpsertNextMegamillions", param, commandType: CommandType.StoredProcedure);
            }
        }

        public void UpdateMegaPrizeJackpot(string amount)
        {
            if (amount != null)
            {
                var jackpotPrize = _ctx.MegamillionPrize.Find(5);
                if (jackpotPrize != null)
                {
                    var newAmount = Convert.ToDecimal(amount.Replace("$", string.Empty).Replace(",", string.Empty));
                    jackpotPrize.prize = newAmount;
                }
            }
        }
    }
}