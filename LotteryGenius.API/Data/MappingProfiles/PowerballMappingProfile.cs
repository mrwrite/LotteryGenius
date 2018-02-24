using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using LotteryGenius.API.Data.Entities;
using LotteryGenius.API.ViewModels;

namespace LotteryGenius.API.Data.MappingProfiles
{
    public class PowerballMappingProfile : Profile
    {
        public PowerballMappingProfile()
        {
            CreateMap<Powerball, PowerballViewModel>()
                .ForMember(p => p.PowerballId, mv => mv.MapFrom(m => m.id))
                .ForMember(p => p.Powerball1, mv => mv.MapFrom(m => m.ball1))
                .ForMember(p => p.Powerball2, mv => mv.MapFrom(m => m.ball2))
                .ForMember(p => p.Powerball3, mv => mv.MapFrom(m => m.ball3))
                .ForMember(p => p.Powerball4, mv => mv.MapFrom(m => m.ball4))
                .ForMember(p => p.Powerball5, mv => mv.MapFrom(m => m.ball5))
                .ForMember(p => p.PowerBall, mv => mv.MapFrom(m => m.powerball))
                .ForMember(p => p.PowerPlay, mv => mv.MapFrom(m => m.powerplay))
                .ForMember(p => p.PowerballJackpot, mv => mv.MapFrom(m => m.jackpot))
                .ForMember(p => p.PowerballDrawDate, mv => mv.MapFrom(m => m.draw_date))
                .ReverseMap();
        }
    }
}