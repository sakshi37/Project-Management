using MediatR;

namespace HR.Application.Features.Employee.Commands.Query
{
    public record GetAllEmployeeQuery : IRequest<IEnumerable<GetEmployeeVm>>
    {
        public int Id { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
