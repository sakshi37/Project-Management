using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Designations.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Designations.Queries.GetAllDesignations
{
    
    public record GetAllDesignationsQuery : IRequest<List<DesignationDto>>;

}
