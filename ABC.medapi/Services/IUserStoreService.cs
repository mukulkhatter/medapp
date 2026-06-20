using ABC.medapi.Models;

namespace ABC.medapi.Services
{
    public interface IUserStoreService
    {
        IEnumerable<User> GetAllUser();

        User AddUser(User newMed);

        bool IsUserAuthenticated(string email,string password);
    }
}
