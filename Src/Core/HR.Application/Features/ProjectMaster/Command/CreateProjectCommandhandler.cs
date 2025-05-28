using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using MediatR;

namespace HR.Application.Features.ProjectMaster.Command
{
    public class CreateProjectCommandhandler : IRequestHandler<CreateProjectCommand, CreateProjectDto>
    {
        readonly IMapper _mapper;
        readonly IProjectRepository _repository;
        public CreateProjectCommandhandler(IProjectRepository project, IMapper mapper)
        {
            _mapper = mapper;
            _repository = project;

        }

        public async Task<CreateProjectDto> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
        {
            var project = await _repository.InsertProject(request.ProjectDto);
            var responce = _mapper.Map<CreateProjectDto>(project);
            return responce;
        }


    }
}
