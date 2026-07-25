using ABC.medapi.Models;
using ABC.medapi.Services;
using ABC.medapi.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.Resource;

namespace ABC.medapi.Controllers
{
    
    [ApiController]
    //[Authorize]
    [Route("api/[controller]")]
    public class MedController : ControllerBase
    {
        private readonly IMedStoreService _storeService;
        private readonly IServiceC _serviceC;
        private readonly IServiceA _serviceA;
        private readonly IServiceB _serviceB;
        private readonly IBlobService _blobService; // Custom wrapper writtem

        public MedController(IMedStoreService storeService, IServiceC serviceC, IServiceA serviceA, IServiceB serviceB, IBlobService blobService)
        {
            _storeService = storeService;
            _serviceC = serviceC;
            _serviceA = serviceA;
            _serviceB = serviceB;
            _blobService= blobService;

        }

        [HttpGet]
        [RequiredScope("Scope.Read")]
        public ActionResult<IEnumerable<MedItem>> GetAll()
        {
            var tt = User;
             
            return Ok(_storeService.GetAll());
        }

        [HttpGet("search/{name}")]
        public ActionResult<IEnumerable<MedItem>> SearchByName([FromRoute] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("Name route parameter is required.");
            }
             _serviceA.Execute();
            _serviceC.SetName(name); // Set the name in ServiceC
            _serviceA.Execute(); // Execute ServiceA
            _serviceB.Execute(); // Execute ServiceB

            return Ok(_storeService.SearchByName(name));
        }

        [HttpGet("azureFeatureDemo")]
        public ActionResult<IEnumerable<MedItem>> AzureFeatureDemo()
        {
            // Method Demo's Blob and Cache Service
            _blobService.GetBlob("");

            return Ok();
        }


        [HttpPost]
        public ActionResult<MedItem> AddMed([FromBody] MedItem newMed)
        {
            if (newMed is null)
            {
                return BadRequest("Request body cannot be empty.");
            }

            if (string.IsNullOrWhiteSpace(newMed.Brand) || string.IsNullOrWhiteSpace(newMed.Name))
            {
                return BadRequest("Brand and Name are required.");
            }

            var addedMed = _storeService.AddMed(newMed);
            return CreatedAtAction(nameof(GetAll), new { }, addedMed);
        }
    }
}
