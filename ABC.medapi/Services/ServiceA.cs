using System;
using ABC.medapi.Services.Interface;

namespace ABC.medapi.Services
{
    public class ServiceA:IServiceA 
    {
        private readonly IServiceC _serviceC;

        public ServiceA(IServiceC serviceC)
        {
            _serviceC = serviceC;
        }

       
        public void Execute()
        {

            Console.WriteLine("ServiceA is executing. with Name" + _serviceC.GetName());
        }

       
    }
}
