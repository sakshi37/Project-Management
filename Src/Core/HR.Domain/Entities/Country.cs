using System;

namespace HR.Domain.Entities;

public class Country
{
    public int CountryId { get; set; }
    public string CountryName { get; set; }
    public string CountryCode { get; set; }
    public bool CountryStatus { get; set; }
    public int? CreatedBy { get; set; }
    public DateTime? CreatedDate { get; set; }
    public int? UpdatedBy { get; set; }
    public DateTime? UpdatedDate { get; set; }
}

