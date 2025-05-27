using HR.Persistence.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Employee_infoController : ControllerBase
    {
        private readonly AppDbContext _context;
        public Employee_infoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("total-count")]
        public async Task<IActionResult> GetTotalEmployees()
        {
            var result = await _context.TotalValues
                .FromSqlRaw("EXEC SP_GetTotalEmployees").AsNoTracking().ToListAsync();
            var totalResult = result.FirstOrDefault();

            return Ok(totalResult.TotalRecords);
        }
    }
}
