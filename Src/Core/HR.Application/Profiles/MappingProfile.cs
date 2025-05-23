﻿using AutoMapper;
using HR.Application.Dtos;
using HR.Application.Features.Branches.Commands.CreateBranch;
using HR.Application.Features.Branches.Commands.Dtos;
using HR.Application.Features.Cities.Commands.CreateCity;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.Cities.Commands.UpdateCity;
using HR.Application.Features.Countries.Commands.CreateCountry;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Application.Features.Designations.Commands.CreateDesignation;
using HR.Application.Features.Designations.Commands.Dtos;
using HR.Application.Features.Designations.Commands.UpdateDesignation;
using HR.Application.Features.Divisions.Command.CreateLocationCommand;
using HR.Application.Features.Divisions.Command.Dtos;
using HR.Application.Features.Divisions.Command.UpdateDivision;
using HR.Application.Features.Employees.Commands.UpdateEmployee;
using HR.Application.Features.Holidays.Commands.CreateHoliday;
using HR.Application.Features.Holidays.Commands.Dtos;
using HR.Application.Features.Holidays.Commands.UpdateHoliday;
using HR.Application.Features.Locations.Dtos;
using HR.Application.Features.Locations.Queries.GetAllLocation;
using HR.Application.Features.States.Commands.CreateState;
using HR.Application.Features.States.Commands.Dtos;
using HR.Application.Features.States.Commands.UpdateState;
using HR.Application.Features.TeamCompositions.Commands.CreateTeamComposition;
using HR.Application.Features.TeamCompositions.Commands.Dtos;
using HR.Application.Features.TeamCompositions.Commands.UpdateTeamComposition;
using HR.Application.Features.TimeSheet.Commands.CreateTimeSheet;
using HR.Domain.Entities;


namespace HR.Application.Profiles;


public class MappingProfile : Profile
{

    public MappingProfile()
    {
        CreateMap<Tbl_LoginMaster, Tbl_LoginMasterDto>().ReverseMap();


        CreateMap<CreateTimeSheetDto, TimeSheet>();
        CreateMap<TimeSheet, CreateTimeSheetDto>();
        CreateMap<CreateEmployeeMasterDto, Employee>()
.ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image != null ? Convert.FromBase64String(src.Image) : null))
.ForMember(dest => dest.Signature, opt => opt.MapFrom(src => src.Signature != null ? Convert.FromBase64String(src.Signature) : null)); // Decode Base64 string to byte[]
                                                                                                                                       //.ForMember(dest => dest.JoinDate, opt => opt.MapFrom(src => src.JoinDate));

        CreateMap<Employee, CreateEmployeeMasterDto>()
              .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image != null ? Convert.ToBase64String(src.Image) : null)) // Encode byte[] to Base64 string
              .ForMember(dest => dest.Signature, opt => opt.MapFrom(src => src.Signature != null ? Convert.ToBase64String(src.Signature) : null)); // Encode byte[] to Base64 string

        CreateMap<CreateCountryDto, Country>();
        CreateMap<UpdateCountryDto, Country>();
        CreateMap<Country, CountryDto>().ReverseMap();

        CreateMap<CreateStateDto, State>();
        CreateMap<UpdateStateDto, State>();
        CreateMap<State, StateDto>().ReverseMap();

        CreateMap<CreateDesignationDto, Designation>();
        CreateMap<UpdateDesignationDto, Designation>();
        CreateMap<Designation, DesignationDto>();
        CreateMap<Location, LocationDto>().ReverseMap();

        CreateMap<CreateCityDto, City>();
        CreateMap<UpdateCityDto, City>();
        CreateMap<City, CityDto>().ReverseMap();
        //CreateMap<Employee, GetEmployeeVm>();

        CreateMap<CreateHolidayDto, Holiday>();
        CreateMap<UpdateHolidayDto, Holiday>();
        CreateMap<Holiday, HolidayDto>();
        CreateMap<CreateTeamCompositionDto, TeamComposition>();
        CreateMap<UpdateTeamCompositionDto, TeamComposition>();
        CreateMap<TeamComposition, TeamCompositionDto>().ReverseMap();

        CreateMap<Branch, BranchDto>();
        CreateMap<CreateBranchDto, Branch>();

        CreateMap<UpdateEmployeeCommandDto, Employee>();
        CreateMap<UpdateEmployeeCommand, UpdateEmployeeCommandDto>()
            .ConstructUsing(cmd => cmd.Dto);

        CreateMap<CreateDivisionDto, division>();
        CreateMap<UpdateDivisionDto, City>();
        CreateMap<division, DivisionDto>().ReverseMap();
    }
}
