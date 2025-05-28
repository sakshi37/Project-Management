using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.ProjectMaster.Stack.Query.GetAllStack;
using MediatR;

namespace HR.Application.Features.ProjectMaster.Stack.Queries.GetAllStack
{
    public class GetAllStackQueryHandler : IRequestHandler<GetAllStackQuery, List<GetAllStackDto>>
    {
        readonly IMapper _mapper;
        readonly IProjectRepository _projectRepository;
        public GetAllStackQueryHandler(IProjectRepository projectRepository, IMapper mapper)
        {
            _mapper = mapper;
            _projectRepository = projectRepository;

        }
        public async Task<List<GetAllStackDto>> Handle(GetAllStackQuery request, CancellationToken cancellationToken)
        {
            var stack = await _projectRepository.GetAllStack();
            var stacks = _mapper.Map<List<GetAllStackDto>>(stack);
            return stacks;
        }
    }
}
