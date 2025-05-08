using System;
using System.ComponentModel.DataAnnotations;

namespace HR.Application.Features.Countries.Commands.UpdateCountry;

public class UpdateCountryDto
{
    public int CountryId { get; set; }
    public string CountryName { get; set; }
    public string CountryCode { get; set; }
    public bool CountryStatus { get; set; }
    public int UpdatedBy { get; set; }
}
