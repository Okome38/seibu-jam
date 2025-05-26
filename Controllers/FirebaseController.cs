using Microsoft.AspNetCore.Mvc;
using Fukuinct2025.Models;
using Fukuinct2025.Services;

namespace seibuDatabase.Controllers
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

