using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using LotteryGenius.API.Data.Models;
using LotteryGenius.API.ViewModels;

namespace LotteryGenius.API.Data.MappingProfiles
{
    using LotteryGenius.API.Data.Entities;

    public class PowerPicksMappingProfile : Profile
    {
        public PowerPicksMappingProfile()
        {
            CreateMap<PowerballPicks, PowerPicksViewModel>()
                .ForMember(p => p.ball1, mv => mv.MapFrom(m => m.ball1))
                .ForMember(p => p.ball2, mv => mv.MapFrom(m => m.ball2))
                .ForMember(p => p.ball3, mv => mv.MapFrom(m => m.ball3))
                .ForMember(p => p.ball4, mv => mv.MapFrom(m => m.ball4))
                .ForMember(p => p.ball5, mv => mv.MapFrom(m => m.ball5))
                .ForMember(p => p.powerball, mv => mv.MapFrom(m => m.powerball))
                .ForMember(p => p.powerplay, mv => mv.MapFrom(m => m.powerplay))
                .ForMember(p => p.pick_date, mv => mv.MapFrom(m => m.pick_date))
                .ForMember(p => p.id, mv => mv.MapFrom(m => m.id))
               .ReverseMap();
        }
    }
}