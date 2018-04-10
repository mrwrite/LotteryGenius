using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using LotteryGenius.API.Data.Entities;
using LotteryGenius.API.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace LotteryGenius.API.Data.Repositories
{
    public class PowerballRepository : IPowerballRepository
    {
        private readonly LotteryGeniusContext _ctx;
        private readonly ILogger<PowerballRepository> _logger;
        private readonly string _connectionString;
        private IDbConnection _connection { get { return new SqlConnection(_connectionString); } }

        public PowerballRepository(LotteryGeniusContext ctx, ILogger<PowerballRepository> logger)
        {
            _ctx = ctx;
            _logger = logger;
            _connectionString =
                "server=DESKTOP-CV71GOA;Initial Catalog=LotteryGenius;Integrated Security=True;MultipleActiveResultSets=true;";
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

            _ctx.Powerballs.Add(number);
        }

        public IEnumerable<PowerPicksViewModel> GetPowerballPicks()
        {
            try
            {
                using (IDbConnection dbConnection = _connection)
                {
                    dbConnection.Open();
                    var picks = dbConnection.QueryMultiple("dbo.GetPowerballPicks", commandType: CommandType.StoredProcedure);
                    var results = picks.Read<PowerPicksViewModel>().ToList();
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
                using (IDbConnection dbConnection = _connection)
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

                using (IDbConnection dbConnection = _connection)
                {
                    dbConnection.Execute("dbo.AddPowerWinners", param, commandType: CommandType.StoredProcedure);
                    numbers.Clear();
                    winningNumber.Clear();
                }
            }
        }

        public IEnumerable<PowerWinnerViewModel> ShowPowerballWinners()
        {
            try
            {
                using (IDbConnection dbConnection = _connection)
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
    }
}