using HR.Application.Contracts.Models.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Divisions.Query.GetProjectManager
{
    public class GetAllProjectManagerQueryHandler :IRequestHandler<GetAllProjectManagerQuery, List<GetAllProjectManagerDto>>
    {
        private readonly IDivisionRepositry _divisionRepositry;
        public GetAllProjectManagerQueryHandler(IDivisionRepositry divisionRepository)
        {
            _divisionRepositry = divisionRepository;
        }

        public async Task<List<GetAllProjectManagerDto>> Handle(GetAllProjectManagerQuery request, CancellationToken cancellationToken)
        {
            return await _divisionRepositry.GetAllPMAsync();
        }
    }
}
