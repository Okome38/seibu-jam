using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using seibuDatabase.Services;
using seibuDatabase.Models;
using Fukuinct2025.Models;

namespace Fukuinct2025.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly FirebaseService _firebaseService;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
        _firebaseService = new FirebaseService();
    }

    public async Task<IActionResult> Index()
    {
        var messages = await _firebaseService.GetMessages();
        
        // ユーザーのリアクション情報を取得
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        var userAgent = HttpContext.Request.Headers["User-Agent"].ToString();
        var userReactions = await _firebaseService.GetUserReactions(ipAddress, userAgent);
        
        ViewBag.UserReactions = userReactions;
        
        return View(messages);
    }

    [HttpPost]
    public IActionResult Post(string text)
    {
        this.ViewData["YourInput"] = text;
        return View(nameof(Index));
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    public IActionResult Privacy()
    {
        return View();
    }
}
