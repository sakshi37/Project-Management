using HR.Application.Contracts.Persistence;
using HR.Application.Features.TimeSheet.Commands.CreateTimeSheet;
using HR.Application.Features.TimeSheet.Queries;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class TimeSheetRepository : ITimeSheetRepository
    {
        readonly AppDbContext _DbContext;
        public TimeSheetRepository(AppDbContext dbContext)
        {

            _DbContext = dbContext;

        }


        public async Task<TimeSheet> AddTimeSheet(CreateTimeSheetDto timeSheetDto)
        {
            string sql = "EXEC SP_TimeSheetInsert  @Fk_EmployeeId = {0}, @Fk_JobId = {1},@StartDate = {2}, @EndDate = {3}, @CreatedBy = {4}, @TimeSheetStatus = {5}";
            await _DbContext.Database.ExecuteSqlRawAsync(sql, timeSheetDto.EmployeeId, timeSheetDto.JobId, timeSheetDto.StartDate, timeSheetDto.EndDate, timeSheetDto.CreatedBy, timeSheetDto.TimeSheetStatus);

            return new TimeSheet
            {
                EmployeeId = timeSheetDto.EmployeeId,
                JobId = timeSheetDto.JobId,
                StartDate = timeSheetDto.StartDate,
                EndDate = timeSheetDto.EndDate,
                CreatedBy = timeSheetDto.CreatedBy,
                TimeSheetStatus = timeSheetDto.TimeSheetStatus


            };

        }



        public async Task<List<GetAllTimeSheetListDto>> GetAllTimeSheetList()
        {
            return await _DbContext.timeSheetListDtos.FromSqlRaw("EXEC SP_TimeSheetGetAll").ToListAsync();
        }



    }
}

