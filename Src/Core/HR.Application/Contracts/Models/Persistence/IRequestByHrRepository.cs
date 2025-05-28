using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IRequestByHrRepository
    {
        Task<int> CreateRequestAsync(string forEmpCode, string requestByEmpCode, string reason);

    }
}
