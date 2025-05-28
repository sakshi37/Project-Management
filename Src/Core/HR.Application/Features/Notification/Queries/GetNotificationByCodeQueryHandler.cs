using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Notification.Queries
{
    public class GetNotificationByCodeQueryHandler:IRequestHandler<GetNotificationByCodeQuery,List<GetNotificationByCodeVm>>
    {
        private readonly INotificationRepository  _notificationRepository;
        private readonly IMapper _mapper;


        public GetNotificationByCodeQueryHandler(INotificationRepository notificationRepository, IMapper mapper)
        {
            _notificationRepository = notificationRepository;
            _mapper = mapper;
        }

        public async Task<List<GetNotificationByCodeVm>> Handle(GetNotificationByCodeQuery request, CancellationToken cancellationToken)
        {
            return await _notificationRepository.GetNotificationDetailsAsync(request.EmpCode);
        }

    }
}
