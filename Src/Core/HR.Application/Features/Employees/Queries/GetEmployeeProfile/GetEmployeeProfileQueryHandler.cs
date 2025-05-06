using HR.Application.Contracts.Persistence;
using MediatR;
using AutoMapper;
using System.Threading;
using System.Threading.Tasks;

namespace HR.Application.Features.Employee.Queries.GetEmployeeProfile
{
    public class GetEmployeeProfileQueryHandler : IRequestHandler<GetEmployeeProfileQuery, GetEmployeeProfileQueryVm>
    {
        private readonly IEmployeeMasterRepository _repo;
        private readonly IMapper _mapper;

        // Constructor injection for repository and mapper
        public GetEmployeeProfileQueryHandler(IEmployeeMasterRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // Handling the request
        public async Task<GetEmployeeProfileQueryVm> Handle(GetEmployeeProfileQuery request, CancellationToken cancellationToken)
        {
            // Fetch employee data from repository using the provided ID
            var employeeProfileDto = await _repo.GetEmployeeProfileAsync(request.Code);

            if (employeeProfileDto == null)
            {
                return null;  // Or handle it as needed (e.g., throw exception, return empty ViewModel, etc.)
            }

            // Map the raw DTO to the ViewModel
            var employeeProfileVm = _mapper.Map<GetEmployeeProfileQueryVm>(employeeProfileDto);

            return employeeProfileVm;
        }
    }
}
