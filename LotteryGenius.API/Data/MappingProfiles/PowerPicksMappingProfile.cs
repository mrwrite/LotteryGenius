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
    public class PowerPicksMappingProfile : Profile
    {
        public PowerPicksMappingProfile()
        {
            CreateMap<PowerPicks, PowerPicksViewModel>()
                .ForMember(p => p.ball1, mv => mv.MapFrom(m => m))
                .ForMember(p => p.ball2, mv => mv.MapFrom(m => m))
                .ForMember(p => p.ball3, mv => mv.MapFrom(m => m))
                .ForMember(p => p.ball4, mv => mv.MapFrom(m => m))
                .ForMember(p => p.ball5, mv => mv.MapFrom(m => m))
                .ForMember(p => p.powerball, mv => mv.MapFrom(m => m))
                .ForMember(p => p.powerplay, mv => mv.MapFrom(m => m))
                .ReverseMap();
        }
    }
}