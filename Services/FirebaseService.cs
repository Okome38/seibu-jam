using Firebase.Database;
using Firebase.Database.Query;
using seibuDatabase.Models;

namespace seibuDatabase.Services
{
    public class FirebaseService
    {
        private readonly FirebaseClient _firebase;

        public FirebaseService()
        {
            _firebase = new FirebaseClient("https://seibudatabase-default-rtdb.firebaseio.com/");
        }

        public async Task AddMessage(string name, string message)
        {
            await _firebase
              .Child("messages")
              .PostAsync(new { name = name, message = message, timestamp = DateTime.UtcNow });
        }

        public async Task<List<Message>> GetMessages()
        {
            var messages = await _firebase
              .Child("messages")
              .OrderBy("timestamp")
              .OnceAsync<Message>();

            return messages.Select(x => x.Object).ToList();
        }
    }
}
