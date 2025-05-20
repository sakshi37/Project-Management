using HR.Application.Contracts.Persistence;
using HR.Application.Features.TimeSheet.Commands.CreateTimeSheet;
using HR.Application.Features.TimeSheets.Commands.PunchIn.Queries;
using HR.Application.Features.TimeSheets.Queries.GetAllTimeSheet;
using HR.Application.Features.TimeSheets.Queries.GetByIdTimeSheet;
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
            string sql = "EXEC SP_TimeSheetInsert @Fk_JobId = {0},@Sequence = {1},@Part={2}, @Activity={3}, @Type={4}, @StartTime = {5}, @EndTime = {6},@Hrs={7}, @Min={8}, @Fk_EmployeeId = {9},   @TimeSheetStatus = {10}";
            await _DbContext.Database.ExecuteSqlRawAsync(sql, timeSheetDto.JobId, timeSheetDto.Sequence, timeSheetDto.Part, timeSheetDto.Activity, timeSheetDto.Type, timeSheetDto.StartTime, timeSheetDto.EndDTime, timeSheetDto.Hrs, timeSheetDto.Min, timeSheetDto.EmpId, timeSheetDto.TimeSheetStatus);

            return new TimeSheet
            {

                JobId = timeSheetDto.JobId,
                Sequence = timeSheetDto.Sequence,
                Part = timeSheetDto.Part,
                Activity = timeSheetDto.Activity,
                Type = timeSheetDto.Type,
                StartTime = timeSheetDto.StartTime,
                EndDTime = timeSheetDto.EndDTime,
                Hrs = timeSheetDto.Hrs,
                Min = timeSheetDto.Min,
                EmpId = timeSheetDto.EmpId,
                TimeSheetStatus = timeSheetDto.TimeSheetStatus,


            };

        }


        public async Task<List<GetAllTimeSheetListDto>> GetAllTimeSheetList()
        {
            return await _DbContext.timeSheetListDtos.FromSqlRaw("EXEC SP_TimeSheetGetAll").ToListAsync();
        }

        public async Task<List<GetAllAttendanceDto>> GetAllAttendance()
        {
            return await _DbContext.GetAllAttendanceDtos.FromSqlRaw("EXEC SP_AttendanceGetAll").ToListAsync();
        }
        public async Task PunchIn(int empId, DateTime startDateTime)

        {
            string sql = "EXEC dbo.SP_AttendanceInsert  @Fk_EmpId={0}, @StartDate={1}";
            await _DbContext.Database.ExecuteSqlRawAsync(sql, empId, startDateTime);

        }

        public async Task<Attendance?> GetCurrentSession(int empId)
        {
            string sql = "EXEC dbo.SP_GetCurrentSession @FK_EmpId={0}";

            var openPunchIn = await _DbContext.attendance
                .FromSqlRaw(sql, empId)
                .AsNoTracking()
                .ToListAsync();

            return openPunchIn.FirstOrDefault();
        }

        public async Task PunchOut(int empId, DateTime endDateTime)
        {
            string sql = "EXEC  dbo.SP_AttendanceUpdate @Fk_EmpId={0}, @EndDate={1}";
            await _DbContext.Database.ExecuteSqlRawAsync(sql, empId, endDateTime);
        }

        public async Task UpdateCurrentSession(int empId)
        {
            string sql = "EXEC dbo.SP_UpdateCurrentSession @Fk_EmpId={0}";
            await _DbContext.Database.ExecuteSqlRawAsync(sql, empId);
        }

        public async Task<GetByIdTimeSheetDto> TimeSheetGetById(int empId)
        {
            var result = await _DbContext.timesheetGetByDto
                .FromSqlRaw("EXEC SP_TimeSheetMasterGetById @Fk_EmployeeId = {0}", empId)
                .AsNoTracking()
                .ToListAsync();

            return result.FirstOrDefault();
        }




    }
}


