﻿using HR.Application.Features.Branches.Commands.Dtos;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Designations.Commands.Dtos;
using HR.Application.Features.Employee.Dtos;
using HR.Application.Features.Employee.Queries.GetEmployeeProfile;
using HR.Application.Features.Employees.Queries.GetAllEmployees;
using HR.Application.Features.Holidays.Commands.Dtos;
using HR.Application.Features.Location.Query;
using HR.Application.Features.States.Commands.Dtos;
using HR.Application.Features.TimeSheet.Queries;
using HR.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Context;
public class AppDbContext : DbContext

{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<CountryDto> CountryDtos { get; set; }
    public DbSet<State> States { get; set; }

    public DbSet<StateDto> StateDtos { get; set; }
    public DbSet<DesignationDto> DesignationDtos { get; set; }
    public DbSet<City> Cities { get; set; }
    public DbSet<CityDto> CityDtos { get; set; }
    public DbSet<HolidayDto> HolidayDtos { get; set; }

    public DbSet<EmployeeDto> Employees { get; set; }
    public DbSet<GetAllLocationDto> dtos { get; set; }
    public DbSet<GetAllTimeSheetListDto> timeSheetListDtos { get; set; }
    public DbSet<Tbl_LoginMaster> Tbl_LoginMaster { get; set; }

    public DbSet<GetAllEmployeeVm> GetAllEmployeeVms { get; set; }
    public DbSet<BranchDto> BranchDtos { get; set; }



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CountryDto>().HasNoKey();
        modelBuilder.Entity<StateDto>().HasNoKey();
        modelBuilder.Entity<DesignationDto>().HasNoKey();
        modelBuilder.Entity<City>().ToTable("Tbl_CityMaster");
        modelBuilder.Entity<State>().ToTable("Tbl_StateMaster");

        modelBuilder.Entity<CityDto>().HasNoKey();
        modelBuilder.Entity<HolidayDto>().HasNoKey();

        modelBuilder.Entity<EmployeeDto>().HasNoKey();
        modelBuilder.Entity<GetAllLocationDto>().HasNoKey();
        modelBuilder.Entity<GetAllTimeSheetListDto>().HasNoKey();


        modelBuilder.Entity<BranchDto>().HasNoKey();
        modelBuilder.Entity<GetAllEmployeeVm>().HasNoKey();
        modelBuilder.Entity<GetEmployeeProfileQueryVm>().HasNoKey();




    }
}