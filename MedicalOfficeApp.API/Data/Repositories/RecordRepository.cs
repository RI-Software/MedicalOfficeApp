using MedicalOfficeApp.API.Core;
using MedicalOfficeApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Data.Repositories
{
    public class RecordRepository : IRecordRepository
    {
        private readonly DataContext context;
        private readonly DateRecordCollection recordsInMemory;

        public RecordRepository(DataContext context, DateRecordCollection recordsInMemory)
        {
            this.context = context;
            this.recordsInMemory = recordsInMemory;
        }
        
        public void Add(DbRecord entity) =>
            context.Add(entity);

        public async Task<DbRecord> GetRecord(int id) =>
            await context.Records.FirstOrDefaultAsync(r => r.RecordId == id);

        public async Task<List<DbRecord>> GetRecordsFromDb() =>
            await context.Records.ToListAsync();

        public async Task<List<IRecord>> GetAllRecords()
        {
            List<IRecord> recordsFromDb = await context
                .Records
                .AsQueryable()
                .Cast<IRecord>()
                .ToListAsync();

            List<IRecord> recordsFromMem = recordsInMemory.Records
                .Cast<IRecord>()
                .ToList();

            List<IRecord> recordsToReturn = recordsFromDb.Union(recordsFromMem).ToList();

            return recordsToReturn;
        }

        public async Task<bool> SaveAll() =>
            await context.SaveChangesAsync() > 0;
    }
}
