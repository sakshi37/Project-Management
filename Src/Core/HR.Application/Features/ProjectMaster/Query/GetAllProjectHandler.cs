using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using MediatR;

namespace HR.Application.Features.ProjectMaster.Query
{
    public class GetAllProjectHandler : IRequestHandler<GetAllProjectQuery, List<ProjectOutputDto>>
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _mapper;

        public GetAllProjectHandler(IProjectRepository projectRepository, IMapper mapper)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
        }


        public async Task<List<ProjectOutputDto>> Handle(GetAllProjectQuery request, CancellationToken cancellationToken)
        {
            var response = await _projectRepository.GetAllProjects();
            var projectDtos = _mapper.Map<List<GetAllProjectDto>>(response);
            var result = projectDtos.GroupBy(x => new { x.Id, x.Name }).Select(g => new ProjectOutputDto
            {
                Id = g.Key.Id,
                Name = g.Key.Name,
                Stack = g.Select(s => new StackModel
                {
                    Id = s.StackId,
                    Name = s.StackName
                }).ToList()
            })
            .ToList(); ;





            return result;
        }
    }






}



