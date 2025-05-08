//using AutoMapper;
//using HR.Application.Contracts.Persistence;
//using MediatR;

//namespace HR.Application.Features.Query
//{
//    public class GetAllEmployeeHandler : IRequestHandler<GetAllEmployeeQuery, IEnumerable<GetEmployeeVm>>
//    {

//        readonly IMapper _mapper;
//        readonly IEmployeeMasterRepository _employeeMasterRepository;
//        public GetAllEmployeeHandler(IMapper mapper, IEmployeeMasterRepository iEmployeerepo)
//        {

//            _mapper = mapper;
//            _employeeMasterRepository = iEmployeerepo;

//        }

//        //public async Task<IEnumerable<GetEmployeeVm>> Handle(GetAllEmployeeQuery request, CancellationToken cancellationToken)
//        //{
//        //    //var allEmployee = await _employeeMasterRepository.GetAllEmployee();
//        //    var employee = _mapper.Map<List<GetEmployeeVm>>(allEmployee);
//        //    return employee;
//        //}
//    }
//}
