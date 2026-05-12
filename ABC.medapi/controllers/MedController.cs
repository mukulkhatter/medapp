using ABC.medapi.Models;
using ABC.medapi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ABC.medapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedController : ControllerBase
    {
        private readonly IMedStoreService _storeService;

        public MedController(IMedStoreService storeService)
        {
            _storeService = storeService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<MedItem>> GetAll()
        {
            return Ok(_storeService.GetAll());
        }

        [HttpGet("search/{name}")]
        public ActionResult<IEnumerable<MedItem>> SearchByName([FromRoute] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("Name route parameter is required.");
            }

            return Ok(_storeService.SearchByName(name));
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
