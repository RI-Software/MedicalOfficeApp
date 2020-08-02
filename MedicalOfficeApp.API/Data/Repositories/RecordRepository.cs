using MedicalOfficeApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Data.Repositories
{
    public class RecordRepository : IRecordRepository
    {
        private readonly DataContext context;

        public RecordRepository(DataContext context)
        {
            this.context = context;
        }
        
        public void Add(Record entity) =>
            context.Add(entity);

        public async Task<Record> GetRecord(int id) =>
            await context.Records.FirstOrDefaultAsync(r => r.RecordId == id);

        public async Task<List<Record>> GetRecords() =>
            await context.Records.ToListAsync();

        public async Task<bool> SaveAll() =>
            await context.SaveChangesAsync() > 0;
    }
}
