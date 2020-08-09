using MedicalOfficeApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Data.Repositories
{
    public class RecordRepository : IRecordRepository
    {
        private readonly DataContext context;

        public RecordRepository(DataContext context) =>
            this.context = context;
        
        public void Add(DbRecord entity) =>
            context.Add(entity);

        public async Task<DbRecord> GetRecord(int id) =>
            await context.Records.FirstOrDefaultAsync(r => r.RecordId == id);

        public async Task<List<DbRecord>> GetRecordsFromDb() =>
           await context.Records.ToListAsync();

        public async Task<bool> SaveAll() =>
            await context.SaveChangesAsync() > 0;
    }
}
