using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Annoucements.Dtos;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace HR.Persistence.Repositories
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly IDbConnection _db;

        public AnnouncementRepository(IConfiguration config)
        {
            _db = new SqlConnection(config.GetConnectionString("HrConnString"));
        }

        public async Task<string> InsertAsync(BroadcastAnnouncementDto dto)
        {
            var result = await _db.QueryFirstOrDefaultAsync<string>("dbo.SP_BroadcastAnnouncementInsert", new
            {
                dto.Title,
                dto.Message,
                dto.FromDate,
                dto.ToDate,
                dto.TargetType,
                dto.TargetValue,
                CreatedBy = 1
            }, commandType: CommandType.StoredProcedure);

            return result;
        }

        public async Task<List<BroadcastAnnouncementDto>> GetTodayAnnouncementsAsync()
        {
            var result = await _db.QueryAsync<BroadcastAnnouncementDto>("dbo.SP_GetTodayBroadcastAnnouncements", commandType: CommandType.StoredProcedure);
            return result.ToList();
        }
    }

}
