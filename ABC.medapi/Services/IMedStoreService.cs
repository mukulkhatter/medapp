using ABC.medapi.Models;

namespace ABC.medapi.Services
{
    public interface IMedStoreService
    {
        IEnumerable<MedItem> GetAll();
        IEnumerable<MedItem> SearchByName(string name);
        MedItem AddMed(MedItem newMed);
    }
}
