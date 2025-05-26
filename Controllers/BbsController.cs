// Controllers/BbsController.cs
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Data.SqlClient;
// using Dapper; // Dapperを使うと簡単

// [ApiController]
// [Route("api/[controller]")]
// public class BbsController : ControllerBase
// {
//     private readonly string connectionString = "Server=seibu-board.database.windows.net;Database=創造工学演習_データベース;User Id=Okome38;Password=Oneshota@3150;";

//     [HttpGet]
//     public IActionResult GetPosts()
//     {
//         using var conn = new SqlConnection(connectionString);
//         var posts = conn.Query<Post>("SELECT * FROM Posts ORDER BY PostedAt DESC");
//         return Ok(posts);
//     }

//     [HttpPost]
//     public IActionResult AddPost([FromBody] Post newPost)
//     {
//         using var conn = new SqlConnection(connectionString);
//         var sql = "INSERT INTO Posts (Name, Message) VALUES (@Name, @Message)";
//         conn.Execute(sql, new { newPost.Name, newPost.Message });
//         return Ok();
//     }

//     public class Post
//     {
//         public int Id { get; set; }
//         public string? Name { get; set; }
//         public string? Message { get; set; }
//         public DateTime? PostedAt { get; set; }
//     }
// }
