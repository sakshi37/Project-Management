//using AutoMapper;
//using HR.Application.Contracts.Models.Persistence;
//using HR.Application.Features.Divisions.Command.Dto;
//using MediatR;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace HR.Application.Features.Divisions.Command.UpdateDivision
//{
//    public class UpdateDivisionCommandHandler : IRequestHandler<UpdateDivisionCommand, DivisionDtos>
//    {
//        IDivisionRepositry _repo;
//        IMapper _mapper;
//        public UpdateDivisionCommandHandler(IDivisionRepositry repo, IMapper mapper)
//        {
//          _mapper = mapper;  
//            _repo = repo;
//        }
//        public async Task<DivisionDtos> Handle(UpdateDivisionCommand request, CancellationToken cancellationToken)
//        {
//           var updated= await _repo.UpdateAsync(request.Division);
//            return _mapper.Map<DivisionDtos>(updated);

//        }
//    }
//}
