using System.Data;
using Dapper;
using HR.Broadcast.API.Features.Commands;
using HR.Broadcast.API.Features.Dtos;
using HR.Broadcast.API.Interfaces;
using Microsoft.Data.SqlClient;


namespace HR.Broadcast.API.Repositories
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        public readonly IDbConnection _db;
        public AnnouncementRepository(IConfiguration config)
        {
            _db = new SqlConnection(config.GetConnectionString("HrConnString"));
        }

        public async Task<List<AnnouncementDto>> GetTodayAnnouncementsAsync()
        {
            var result = await _db.QueryAsync<AnnouncementDto>("dbo.SP_GetTodayBroadcastAnnouncements", commandType: CommandType.StoredProcedure);
            return result.ToList();
        }
        public async Task<string> InsertAsync(AnnouncementDto dto)
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

        public async Task<List<AnnouncementDto>> GetAnnouncementsForUserAsync(string employeeCode, string userGroup)
        {

            var result = await _db.QueryAsync<AnnouncementDto>(
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
