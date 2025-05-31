namespace seibuDatabase.Models
{
    public class Message
    {
        public string id { get; set; } // FirebaseのキーIDを格納
        public string name { get; set; }
        public string message { get; set; }
        public DateTime timestamp { get; set; }
        public int likeCount { get; set; } = 0;
        public int dislikeCount { get; set; } = 0;
        public Dictionary<string, string> reactions { get; set; } = new Dictionary<string, string>();
    }
}
