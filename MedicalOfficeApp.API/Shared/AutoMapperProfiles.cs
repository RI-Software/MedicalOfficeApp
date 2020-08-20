using AutoMapper;
using MedicalOfficeApp.API.Dtos;
using MedicalOfficeApp.API.Models;
using MedicalOfficeApp.API.Shared;

namespace MedicalOfficeApp.API.Core
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<ClientDto, Client>().ForMember(dest => dest.Phone, opt =>
                opt.MapFrom(src => src.Phone.MakeAcceptableNumber()));
        }
    }
}
