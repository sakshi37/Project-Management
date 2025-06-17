using AutoMapper;
using HR.Broadcast.API.Features.Dtos;
using HR.Broadcast.API.Models;

namespace HR.Broadcast.API.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Announcement, AnnouncementDto>();


        }


    }
}
