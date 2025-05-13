using HR.Application.Features.TimeSheet.Commands.CreateTimeSheet;
using HR.Application.Features.TimeSheet.Queries;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Persistence
{
    public interface ITimeSheetRepository
    {
        Task<TimeSheet> AddTimeSheet(CreateTimeSheetDto timeSheetDto);
        Task<List<GetAllTimeSheetListDto>> GetAllTimeSheetList();

        Task punchIn(int empId, DateTime startDateTime);
        Task<Attendance> CheckOpenPunchIn(int empId);
    }
}
