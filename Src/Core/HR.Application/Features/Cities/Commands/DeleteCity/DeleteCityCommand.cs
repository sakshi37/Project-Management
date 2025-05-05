using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace HR.Application.Features.Cities.Commands.DeleteCity
{
    public record DeleteCityCommand(int CityId, int UpdatedBy) : IRequest<bool>;

}
