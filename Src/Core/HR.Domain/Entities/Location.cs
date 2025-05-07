namespace HR.Domain.Entities
{
    public class Location
    {
        public int LocationId { get; set; }
        public string? LocationName { get; set; }
        public int Fk_CityId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool LocationStatus { get; set; }
        public string? CityName { get; set; }
        public string? StateName { get; set; }
        public string? CountryName { get; set; }
    }
}
