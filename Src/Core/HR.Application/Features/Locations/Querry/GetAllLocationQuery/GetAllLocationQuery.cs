using HR.Application.Features.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Locations.Querry.GetAllLocationQuerry
{
    public record GetAllLocationQuery:IRequest<List<LocationDto>>;

}
