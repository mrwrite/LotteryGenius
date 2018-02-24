using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LotteryGenius.API.Data.Entities;
using Microsoft.Extensions.Logging;

namespace LotteryGenius.API.Data.Repositories
{
    public class PowerballRepository : IPowerballRepository
    {
        private readonly LotteryGeniusContext _ctx;
        private readonly ILogger<PowerballRepository> _logger;

        public PowerballRepository(LotteryGeniusContext ctx, ILogger<PowerballRepository> logger)
        {
            _ctx = ctx;
            _logger = logger;
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

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }
    }
}