using ABC.medapi.Services.Interface;

namespace ABC.medapi.Services
{
    public class ServiceB : IServiceB
    {
        private readonly IServiceC _serviceC;

        public ServiceB(IServiceC serviceC)
        {
            _serviceC = serviceC;
        }
        public void Execute()
        {
           Console.WriteLine("ServiceB is executing. with Name" + _serviceC.GetName());
        }
    }
}
