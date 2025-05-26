using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using seibuDatabase.Services;
using seibuDatabase.Models;


namespace Fukuinct2025.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
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

        private readonly FirebaseService _firebaseService;

    public HomeController()
    {
        _firebaseService = new FirebaseService();
    }

    public async Task<IActionResult> Index()
    {
        var messages = await _firebaseService.GetMessages();
        return View(messages);
    }

}

