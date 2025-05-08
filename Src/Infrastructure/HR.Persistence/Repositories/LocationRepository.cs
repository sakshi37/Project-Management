using HR.Application.Contracts.Persistence;
using HR.Application.Features.Location.Query;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class LocationMasterRepository : ILocationMasterRepository
    {
        readonly AppDbContext _context;
        public LocationMasterRepository(AppDbContext appDbContext)
        {

            _context = appDbContext;
        }



        public async Task<List<GetAllLocationDto>> GetAllLocation()
        {
            return await _context.dtos.FromSqlRaw("EXEC SP_LocationGetAll").ToListAsync();
        }








    }
}
