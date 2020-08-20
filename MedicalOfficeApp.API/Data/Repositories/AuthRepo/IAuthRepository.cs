using MedicalOfficeApp.API.Data.Models;
using System.Threading.Tasks;

namespace MedicalOfficeApp.API.Data.Repositories.AuthRepo
{
    public interface IAuthRepository
    {
        Task<Admin> Login(string username, string password);
    }
}
