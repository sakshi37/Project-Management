using HR.Application.Contracts.Models.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Divisions.Command.DeleteDivision
{
    public class DeleteDivisionCommandHandler : IRequestHandler<DeleteDivisionCommand, bool>
    {
        private readonly IDivisionRepositry _divisionRepositry;

        public DeleteDivisionCommandHandler(IDivisionRepositry divisionRepository)
        {
            _divisionRepositry = divisionRepository;
        }

        public async Task<bool> Handle(DeleteDivisionCommand request, CancellationToken cancellationToken)
        {
            await _divisionRepositry.DeleteAsync(request.DivisionId, request.UpdatedBY);
            return true;
        }
    }
}
