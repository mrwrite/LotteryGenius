using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using LotteryGenius.API.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LotteryGenius.API.Data
{
    public class LotteryGeniusContext : IdentityDbContext<LotteryGeniusUser, IdentityRole<int>, int>
    {
        public LotteryGeniusContext(DbContextOptions<LotteryGeniusContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            foreach (var entity in builder.Model.GetEntityTypes())
            {
                entity.Relational().TableName = entity.Relational().TableName.ToTrimPrefix();
            }
        }

        public DbSet<Powerball> Powerballs { get; set; }
        public DbSet<Megamillion> Megamillions { get; set; }
        public DbSet<MegamillionPicks> MegaPicks { get; set; }
        public DbSet<PowerballPicks> PowerPicks { get; set; }
        public DbSet<MegamillionWinners> MegaWinners { get; set; }
        public DbSet<PowerballWinners> PowerWinners { get; set; }
        public DbSet<PowerballPrize> PowerballPrize { get; set; }
        public DbSet<NextPowerball> NextPowerball { get; set; }
        public DbSet<MegamillionPrize> MegamillionPrize { get; set; }
        public DbSet<NextMegamillion> NextMegamillion { get; set; }
        public DbSet<UserPick> UserPicks { get; set; }
    }

    public static class StringExtensions
    {
        public static string ToTrimPrefix(this string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return input;
            }

            return Regex.Replace(input, @"^AspNet", "");
        }
    }
}