using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Annoucements.Commands.UpdateAnnouncement;
using HR.Application.Features.Annoucements.Dtos;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using static Org.BouncyCastle.Math.EC.ECCurve;

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
        public async Task<List<BroadcastAnnouncementDto>> GetAnnouncementsForUserAsync(string employeeCode, string userGroup)
        {

            var result = await _db.QueryAsync<BroadcastAnnouncementDto>(
                "SP_GetAnnouncementsForUser",
                new { EmployeeCode = employeeCode, UserGroup = userGroup },
                commandType: CommandType.StoredProcedure
            );

            return result.ToList();
        }
        public async Task<bool> UpdateAnnouncementAsync(UpdateAnnouncementCommand command)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Id", command.Id);
            parameters.Add("@Title", command.Title);
            parameters.Add("@Message", command.Message);
            parameters.Add("@FromDate", command.FromDate);
            parameters.Add("@ToDate", command.ToDate);
            parameters.Add("@TargetType", command.TargetType);
            parameters.Add("@TargetValue", command.TargetValue);

            var rowsAffected = await _db.ExecuteAsync("SP_UpdateAnnouncement", parameters, commandType: CommandType.StoredProcedure);
            return rowsAffected > 0;
        }



    }

}
