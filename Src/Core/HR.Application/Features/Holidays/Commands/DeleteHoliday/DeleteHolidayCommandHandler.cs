using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.DeleteCountry;
using MediatR;

namespace HR.Application.Features.Holidays.Commands.DeleteHoliday
{
    public class DeleteHolidayCommandHandler : IRequestHandler<DeleteHolidayCommand, bool>
    {
        private readonly IHolidayRepository _repo;

        public DeleteHolidayCommandHandler(IHolidayRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(DeleteHolidayCommand request, CancellationToken cancellationToken)
        {
            await _repo.DeleteAsync(request.HolidayId, request.UpdatedBy);
            return true;
        }
    }
}
