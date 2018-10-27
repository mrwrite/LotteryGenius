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
    public class MegamillionMappingProfile : Profile
    {
        public MegamillionMappingProfile()
        {
            CreateMap<Megamillion, MegamillionViewModel>()
                .ForMember(p => p.MegamillionId, mv => mv.MapFrom(m => m.id))
                .ForMember(p => p.Megamillion1, mv => mv.MapFrom(m => m.ball1))
                .ForMember(p => p.Megamillion2, mv => mv.MapFrom(m => m.ball2))
                .ForMember(p => p.Megamillion3, mv => mv.MapFrom(m => m.ball3))
                .ForMember(p => p.Megamillion4, mv => mv.MapFrom(m => m.ball4))
                .ForMember(p => p.Megamillion5, mv => mv.MapFrom(m => m.ball5))
                .ForMember(p => p.MegaBall, mv => mv.MapFrom(m => m.megaball))
                .ForMember(p => p.MegaPlier, mv => mv.MapFrom(m => m.megaplier))
                .ForMember(p => p.MegamillionJackpot, mv => mv.MapFrom(m => m.jackpot))
                .ForMember(p => p.MegamillionDrawDate, mv => mv.MapFrom(m => m.draw_date))
                .ReverseMap();
        }
    }
}