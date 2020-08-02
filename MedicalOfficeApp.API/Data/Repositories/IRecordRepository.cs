using MedicalOfficeApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Data.Repositories
{
    public interface IRecordRepository
    {
        void Add(Record entity);

        Task<List<Record>> GetRecords();

        Task<Record> GetRecord(int id);

        Task<bool> SaveAll();
    }
}
