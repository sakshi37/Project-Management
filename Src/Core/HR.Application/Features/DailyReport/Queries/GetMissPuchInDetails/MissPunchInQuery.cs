using MediatR;


namespace HR.Application.Features.DailyReport.Queries.GetMissPuchInDetails
{
    public class MissPunchInQuery: IRequest<List<MissPunchInQueryVm>>
    {
        public DateTime StartDate { get; set; }
    }
}
