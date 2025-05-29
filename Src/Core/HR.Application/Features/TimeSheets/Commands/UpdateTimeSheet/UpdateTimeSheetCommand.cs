using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace HR.Application.Features.TimeSheets.Commands.UpdateTimeSheet
{
    public record UpdateTimeSheetCommand(UpdateTimeSheetDto timeSheetDto) : IRequest<bool> { }
}
