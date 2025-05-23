using HR.Application.Features.TimeSheet.Commands.CreateTimeSheet;
using HR.Application.Features.TimeSheets.Commands.PunchIn.Queries;
using HR.Application.Features.TimeSheets.Queries.GetAllTimeSheet;
using HR.Application.Features.TimeSheets.Queries.GetByIdTimeSheet;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Persistence
{
    public interface ITimeSheetRepository
    {
        Task<TimeSheet> AddTimeSheet(CreateTimeSheetDto timeSheetDto);
        Task<List<GetAllTimeSheetListDto>> GetAllTimeSheetList();

        Task PunchIn(int empId, DateTime startDateTime);
        Task<Attendance?> GetCurrentSession(int empId);

        Task PunchOut(int empId, DateTime endDateTime);

        Task UpdateCurrentSession(int empId);


        Task<List<GetByIdTimeSheetDto>> TimeSheetGetById(int empId);
        Task<List<GetAllAttendanceDto>> GetAllAttendance();
    }
}
