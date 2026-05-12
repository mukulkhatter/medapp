using System.Text.Json;
using ABC.medapi.Models;

namespace ABC.medapi.Services
{
    public class MedStoreService : IMedStoreService
    {
        private readonly object _lock = new();
        private readonly string _storePath;
        private readonly List<MedItem> _store;

        public MedStoreService()
        {
            _storePath = Path.Combine(AppContext.BaseDirectory, "medstore.json");
            _store = LoadStore();
        }

        public IEnumerable<MedItem> GetAll()
        {
            lock (_lock)
            {
                return _store.ToList();
            }
        }

        public IEnumerable<MedItem> SearchByName(string name)
        {
            lock (_lock)
            {
                return _store
                    .Where(m => m.Name.Contains(name, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }
        }

        public MedItem AddMed(MedItem newMed)
        {
            lock (_lock)
            {
                _store.Add(newMed);
                SaveStore();
                return newMed;
            }
        }

        private List<MedItem> LoadStore()
        {
            if (!File.Exists(_storePath))
            {
                return new List<MedItem>();
            }

            var json = File.ReadAllText(_storePath);
            if (string.IsNullOrWhiteSpace(json))
            {
                return new List<MedItem>();
            }

            try
            {
                return JsonSerializer.Deserialize<List<MedItem>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }) ?? new List<MedItem>();
            }
            catch
            {
                return new List<MedItem>();
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
    }
}
