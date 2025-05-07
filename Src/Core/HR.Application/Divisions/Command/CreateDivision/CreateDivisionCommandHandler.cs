//using AutoMapper;
//using HR.Application.Contracts.Models.Persistence;
//using HR.Application.Features.Divisions.Command.Dto;
//using MediatR;

//namespace HR.Application.Features.Divisions.Command.CreateLocationCommand
//{
//    public class CreateDivisionCommandHandler : IRequestHandler<CreateDivisionCommand, DivisionDtos>
//    {
//        readonly IDivisionRepositry _repo;
//        readonly IMapper _mapper;
//        public CreateDivisionCommandHandler(IDivisionRepositry repo ,IMapper mapper) 
//        {
//            _repo = repo;
//            _mapper =mapper;
//        }
//        public async Task<DivisionDtos> Handle(CreateDivisionCommand request, CancellationToken cancellationToken)
//        {
//           var create= await _repo.CreateAsync(request.Division);
//            return _mapper.Map<DivisionDtos>(create);

//        }

//    }
//}
