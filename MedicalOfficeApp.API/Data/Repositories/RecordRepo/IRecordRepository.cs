using MedicalOfficeApp.API.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Data.Repositories
{
    public interface IRecordRepository
    {
        void Add(DbRecord entity);

        IQueryable<DbRecord> GetRecords();

        Task<DbRecord> GetRecord(int id);

        EntityEntry<DbRecord> DeleteRecord(DbRecord record);

        Task<bool> SaveAll();
    }
}
