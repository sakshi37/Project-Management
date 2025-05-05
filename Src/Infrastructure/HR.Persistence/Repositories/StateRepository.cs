using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.States.Commands.CreateState;
using HR.Application.Features.States.Commands.Dtos;
using HR.Application.Features.States.Commands.UpdateState;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class StateRepository : IStateRepository
    {
        private readonly AppDbContext _context;

        public StateRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<State> CreateAsync(CreateStateDto dto)
        {
            var sql = "EXEC SP_StateInsert @Fk_CountryId = {0}, @StateName = {1}, @StateCode = {2}, @CreatedBy = {3}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.CountryId, dto.StateName, dto.StateCode, dto.CreatedBy);
            return new State
            {
                CountryId = dto.CountryId,
                StateName = dto.StateName,
                StateCode = dto.StateCode,
                CreatedBy = dto.CreatedBy,
                CreatedDate = DateTime.UtcNow,
                StateStatus = true
            };
        }

        public async Task<State> UpdateAsync(UpdateStateDto dto)
        {
            var sql = "EXEC SP_StateUpdate @StateId = {0}, @Fk_CountryId = {1}, @StateName = {2}, @StateCode = {3}, @StateStatus = {4}, @UpdatedBy = {5}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.StateId, dto.CountryId, dto.StateName, dto.StateCode, dto.StateStatus, dto.UpdatedBy);
            return new State
            {
                StateId = dto.StateId,
                CountryId = dto.CountryId,
                StateName = dto.StateName,
                StateCode = dto.StateCode,
                UpdatedBy = dto.UpdatedBy,
                UpdatedDate = DateTime.UtcNow,
                StateStatus = dto.StateStatus
            };
        }

        public async Task DeleteAsync(int id, int updatedBy)
        {
            var sql = "EXEC SP_StateDelete @StateId = {0}, @UpdatedBy = {1}";
            await _context.Database.ExecuteSqlRawAsync(sql, id, updatedBy);
        }

        public async Task<List<StateDto>> GetAllAsync()
        {
            return await _context.StateDtos.FromSqlRaw("EXEC SP_GetAllStates").ToListAsync();
        }
    }

}
