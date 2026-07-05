using ABC.medapi.Services.Interface;

namespace ABC.medapi.Services
{
    public class ServiceC : IServiceC
    {
        private string Name { get; set; } = string.Empty;

        public string GetName()
        {
            return Name;
        }
        public void SetName(string name)
        {
            Name = name.ToUpper();
        }
    }
}
