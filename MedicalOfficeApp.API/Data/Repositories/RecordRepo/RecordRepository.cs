using MedicalOfficeApp.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Collections.Generic;
using System.Linq;
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
            await context.Records.Include(r => r.Client).FirstOrDefaultAsync(r => r.RecordId == id);

        public IQueryable<DbRecord> GetRecords() =>
            context.Records.Include(r => r.Client);

        public EntityEntry<DbRecord> DeleteRecord(DbRecord record) =>
            context.Remove(record);

        public async Task<bool> SaveAll() =>
            await context.SaveChangesAsync() > 0;
    }
}
