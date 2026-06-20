using System.Text.Json;
using ABC.medapi.Models;

namespace ABC.medapi.Services
{
    public class UserStoreService : IUserStoreService
    {
        private readonly object _lock = new();
        private readonly string _storePath;
        private readonly List<User> _store;

        public UserStoreService()
        {
            _storePath = Path.Combine(AppContext.BaseDirectory, "userstore.json");
            _store = LoadStore();
        }

        public IEnumerable<User> GetAllUser()
        {
            lock (_lock)
            {
                return _store.ToList();
            }
        }


        public User AddUser(User newUser)
        {
            lock (_lock)
            {
                _store.Add(newUser);
                SaveStore();
                return newUser;
            }
        }

        private List<User> LoadStore()
        {
            if (!File.Exists(_storePath))
            {
                return new List<User>();
            }

            var json = File.ReadAllText(_storePath);
            if (string.IsNullOrWhiteSpace(json))
            {
                return new List<User>();
            }

            try
            {
                return JsonSerializer.Deserialize<List<User>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }) ?? new List<User>();
            }
            catch
            {
                return new List<User>();
            }
        }

        private void SaveStore()
        {
            var json = JsonSerializer.Serialize(_store, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            File.WriteAllText(_storePath, json);
        }

        public bool IsUserAuthenticated(string email, string password)
        {
            if(!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(password))
            {
                lock (_lock)
            {
                var result= _store
                    .FirstOrDefault(m => m.Email==email && m.Password==password);

                    if(result!=null)
                    return true;
                    else
                    return false;
            }
            }
            return false;
        }
    }
}
