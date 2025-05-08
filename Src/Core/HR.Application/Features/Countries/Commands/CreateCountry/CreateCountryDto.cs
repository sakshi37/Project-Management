using System;

namespace HR.Application.Features.Countries.Commands.CreateCountry;

public class CreateCountryDto
{
    public string CountryName { get; set; }
    public string CountryCode { get; set; }
    public int CreatedBy { get; set; }
}
