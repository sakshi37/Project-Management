using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using MediatR;

namespace HR.Application.Features.Admin.Queries.GetAllEmployee
{
    public class GetEmployeeQueryHandler : IRequestHandler<GetEmployeeQuery, List<GetEmployeeDto>>
    {
        readonly IAdminRepository _adminRepository;
        readonly IMapper _mapper;
        public GetEmployeeQueryHandler(IAdminRepository adminRepository, IMapper mapper)
        {

            _adminRepository = adminRepository;
            _mapper = mapper;
        }

        public async Task<List<GetEmployeeDto>> Handle(GetEmployeeQuery request, CancellationToken cancellationToken)
        {
            return await _adminRepository.GetEmployee();
        }
    }
}
