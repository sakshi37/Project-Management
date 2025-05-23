public class CreateEmployeeMasterDto
{
    public string Name { get; set; }

    public string Code { get; set; }

    public string? Address { get; set; }
    public string? MobileNo { get; set; }
    public string? SkypeId { get; set; }
    public string? Email { get; set; }
    public DateTime? JoinDate { get; set; }

    public string? PanNumber { get; set; }
    public DateTime? BirthDate { get; set; }
    public string? Image { get; set; }

    public string? Signature { get; set; }

    public int LocationId { get; set; }

    public int CountryId { get; set; }
    public int StateId { get; set; }
    public int CityId { get; set; }
}

