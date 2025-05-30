using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Notification.Commands.ReadAndDeleteNotification;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Notification.Commands.ReadNotification
{
    public class ReadNotificationCommandHandler : IRequestHandler<ReadNotificationCommand, int>
    {
        private readonly INotificationRepository _repo;
        private readonly IMapper _mapper;

        public ReadNotificationCommandHandler(INotificationRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<int> Handle(ReadNotificationCommand request, CancellationToken cancellationToken)
        {
            return await _repo.ReadNotificationAsync(request.NotificationId);
        }
    }
}
