using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LotteryGenius.API.Data.Repositories
{
    using AutoMapper;

    using LotteryGenius.API.Data.Entities;
    using LotteryGenius.API.Services;

    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Logging;

    public class SettingsRepository : ISettingsRepository
    {
        private readonly LotteryGeniusContext ctx;
        private readonly ILogger<SettingsRepository> logger;
        private readonly IConfiguration config;
        private readonly IMapper mapper;
        private readonly IEmailSender emailSender;

        public SettingsRepository(LotteryGeniusContext ctx,
                                  ILogger<SettingsRepository> logger,
                                  IConfiguration config,
                                  IMapper mapper,
                                  IEmailSender emailSender)
        {
            this.ctx = ctx;
            this.logger = logger;
            this.config = config;
            this.mapper = mapper;
            this.emailSender = emailSender;
        }

        public void AddPlayer(UserPlayer player)
        {
            player.created_on = DateTime.Now;
            player.modified_on = DateTime.Now;
            this.ctx.UserPlayers.Add(player);
        }

        public void EditPlayer(UserPlayer player)
        {
            var oldPlayer = this.ctx.UserPlayers.SingleOrDefault(x => x.user_id == player.user_id);
            oldPlayer.player_id = player.player_id;
            oldPlayer.modified_on = DateTime.Now;
        }

        public UserPlayer GetUserPlayer(int user_id)
        {
            return this.ctx.UserPlayers.SingleOrDefault(x => x.user_id == user_id);
        }
    }
}