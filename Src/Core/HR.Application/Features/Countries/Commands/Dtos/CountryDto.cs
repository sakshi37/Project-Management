using System;

namespace HR.Application.Features.Countries.Commands.Dtos;
public class CountryDto
{
    public int CountryId { get; set; }
    public string CountryName { get; set; }
    public string CountryCode { get; set; }
    public bool CountryStatus { get; set; }
}
