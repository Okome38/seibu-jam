using Microsoft.AspNetCore.Mvc;
using seibuDatabase.Models;
using seibuDatabase.Services;

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

        [HttpPost]
        public async Task<IActionResult> AddReaction(string messageId, bool isLike)
        {
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            var userAgent = HttpContext.Request.Headers["User-Agent"].ToString();
            
            var success = await _firebaseService.AddReaction(messageId, isLike, ipAddress, userAgent);
            
            if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
            {
                // Ajax リクエストの場合は JSON で結果を返す
                return Json(new { success = success });
            }
            
            // 通常のリクエストの場合はリダイレクト
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public async Task<IActionResult> GetUserReactions()
        {
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            var userAgent = HttpContext.Request.Headers["User-Agent"].ToString();
            
            var reactions = await _firebaseService.GetUserReactions(ipAddress, userAgent);
            return Json(reactions);
        }
    }
}
