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
            string sql = "EXEC SP_TimeSheetInsert  @StartDate = {0}, @EndDate = {1}, @Fk_EmployeeId = {2}, @Sequence = {3}, @Fk_JobId = {4}, @TimeSheetStatus = {5}, @CreatedBy = {6}, @CreatedDate = {7}, @UpdatedBy = {8}, @UpdatedDate = {9}";
            await _DbContext.Database.ExecuteSqlRawAsync(sql, timeSheetDto.StartDate, timeSheetDto.EndDate, timeSheetDto.EmpId, timeSheetDto.Sequence, timeSheetDto.JobId, timeSheetDto.TimeSheetStatus, timeSheetDto.CreatedBy, timeSheetDto.CreatedDate, timeSheetDto.UpdatedBy, timeSheetDto.UpdatedDate);

            return new TimeSheet
            {
                StartDate = timeSheetDto.StartDate,
                EndDate = timeSheetDto.EndDate,
                EmpId = timeSheetDto.EmpId,
                Sequence = timeSheetDto.Sequence,
                JobId = timeSheetDto.JobId,

                TimeSheetStatus = timeSheetDto.TimeSheetStatus,
                CreatedBy = timeSheetDto.CreatedBy,
                CreatedDate = timeSheetDto.CreatedDate,
                UpdatedBy = timeSheetDto.UpdatedBy,
                UpdatedDate = timeSheetDto.UpdatedDate,


            };

        }



        public async Task<List<GetAllTimeSheetListDto>> GetAllTimeSheetList()
        {
            return await _DbContext.timeSheetListDtos.FromSqlRaw("EXEC SP_TimeSheetGetAll").ToListAsync();
        }



    }
}

