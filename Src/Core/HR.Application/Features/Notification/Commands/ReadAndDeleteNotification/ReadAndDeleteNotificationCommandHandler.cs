using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Notification.Commands.ReadAndDeleteNotification
{
    public class ReadAndDeleteNotificationCommandHandler:IRequestHandler<ReadAndDeleteNotificationCommand,int>
    {
        private readonly INotificationRepository _repo;
        private readonly IMapper _mapper;

        public ReadAndDeleteNotificationCommandHandler(INotificationRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
         public async Task<int> Handle(ReadAndDeleteNotificationCommand request,CancellationToken cancellationToken)
        {
            return await _repo.ReadAndDeleteNotificationAsync(request.NotificationId);
        }


    }
}
