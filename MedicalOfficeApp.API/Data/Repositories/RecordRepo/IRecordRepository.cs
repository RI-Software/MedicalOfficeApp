using MedicalOfficeApp.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Data.Repositories
{
    public interface IRecordRepository
    {
        void Add(DbRecord entity);

        IQueryable<DbRecord> GetRecords();

        Task<DbRecord> GetRecord(int id);

        Task<bool> SaveAll();
    }
}
