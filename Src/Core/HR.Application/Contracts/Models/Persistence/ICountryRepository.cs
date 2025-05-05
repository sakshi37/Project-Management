using System;
using HR.Application.Features.Countries.Commands.CreateCountry;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Models.Persistence;
public interface ICountryRepository
{
    Task<Country> CreateAsync(CreateCountryDto dto);
    Task<Country> UpdateAsync(UpdateCountryDto dto);
    Task DeleteAsync(int id, int updatedBy);
    Task<List<CountryDto>> GetAllAsync();
    Task<CountryDto> GetByIdAsync(int id);
}

