using ABC.medapi.Models;
using ABC.medapi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ABC.medapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserStoreService _storeService;

        public UserController(IUserStoreService storeService)
        {
            _storeService = storeService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> GetAllUser()
        {
            return Ok(_storeService.GetAllUser());
        }


        [HttpPost]
        public ActionResult<MedItem> AddUser([FromBody] User newUser)
        {
            if (newUser is null)
            {
                return BadRequest("Request body cannot be empty.");
            }

            if (string.IsNullOrWhiteSpace(newUser.Name) || string.IsNullOrWhiteSpace(newUser.Email)
            ||string.IsNullOrWhiteSpace(newUser.Password))
            {
                return BadRequest("Name, Email and Password are required.");
            }

            var addedUser = _storeService.AddUser(newUser);
            return CreatedAtAction(nameof(GetAllUser), new { }, addedUser);
        }

        [HttpPost]
        public ActionResult<bool> IsUserAuthenticated([FromBody] LoginCredentials loginCredentials)
        {
            return _storeService.IsUserAuthenticated(loginCredentials.email,loginCredentials.password);
        }
    }
}
