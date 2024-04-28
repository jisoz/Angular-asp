using backend.Models;

namespace backend.Interfaces
{
    public interface IUserRepository
    {

        Task<User>  Authenticate (string username, string password);

        void Register(string username, string password, string email,string mobile);

        Task<bool> UserAlreadyExist(string username);
    }
}
