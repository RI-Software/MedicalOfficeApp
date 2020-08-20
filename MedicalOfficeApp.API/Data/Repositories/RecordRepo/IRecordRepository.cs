using MedicalOfficeApp.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Data.Repositories
{
    public interface IRecordRepository
    {
        void Add(DbRecord entity);

        Task<List<DbRecord>> GetRecordsFromDb();

        Task<DbRecord> GetRecord(int id);

        Task<bool> SaveAll();
    }
}
