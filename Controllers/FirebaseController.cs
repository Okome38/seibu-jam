using Microsoft.AspNetCore.Mvc;
using YourProject.Models;
using YourProject.Services;

namespace YourProject.Controllers
{
    public class FirebaseController : Controller
    {
        private readonly FirebaseService _firebaseService;

        public FirebaseController()
        {
            _firebaseService = new FirebaseService();
        }

        [HttpPost]
        public async Task<IActionResult> PostMessage(string name, string message)
        {
            await _firebaseService.AddMessage(name, message);
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public async Task<IActionResult> Messages()
        {
            var messages = await _firebaseService.GetMessages();
            return View(messages); // Views/Firebase/Messages.cshtml に表示
        }
    }
}

