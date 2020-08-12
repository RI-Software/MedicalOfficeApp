﻿using AutoMapper;
using MedicalOfficeApp.API.Dtos;
using MedicalOfficeApp.API.Models;
using MedicalOfficeApp.API.Shared;
using System.Linq;

namespace MedicalOfficeApp.API.Core
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserDto, User>().ForMember(dest => dest.Phone, opt =>
                opt.MapFrom(src => src.Phone.CheckPhoneForPlus()));
        }
    }
}
