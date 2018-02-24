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

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }
    }
}