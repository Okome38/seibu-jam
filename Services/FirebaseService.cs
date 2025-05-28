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

        // 丼カウンターを取得
        public async Task<DonCounter> GetDonCounter()
        {
            try
            {
                var counter = await _firebase
                    .Child("donCounter")
                    .OnceSingleAsync<DonCounter>();
                
                return counter ?? new DonCounter 
                { 
                    donCount = 0, 
                    nonDonCount = 0, 
                    lastUpdated = DateTime.UtcNow,
                    lastUpdatedBy = "system"
                };
            }
            catch
            {
                return new DonCounter 
                { 
                    donCount = 0, 
                    nonDonCount = 0, 
                    lastUpdated = DateTime.UtcNow,
                    lastUpdatedBy = "system"
                };
            }
        }

        // 丼カウンターを更新
        public async Task UpdateDonCounter(bool isDon, string updatedBy)
        {
            var currentCounter = await GetDonCounter();
            
            if (isDon)
            {
                currentCounter.donCount++;
            }
            else
            {
                currentCounter.nonDonCount++;
            }
            
            currentCounter.lastUpdated = DateTime.UtcNow;
            currentCounter.lastUpdatedBy = updatedBy;

            await _firebase
                .Child("donCounter")
                .PutAsync(currentCounter);
        }

        // カウンターをリセット
        public async Task ResetDonCounter(string resetBy)
        {
            var resetCounter = new DonCounter
            {
                donCount = 0,
                nonDonCount = 0,
                lastUpdated = DateTime.UtcNow,
                lastUpdatedBy = resetBy
            };

            await _firebase
                .Child("donCounter")
                .PutAsync(resetCounter);
        }
    }
}
