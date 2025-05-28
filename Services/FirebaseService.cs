using Firebase.Database;
using Firebase.Auth;
using Firebase.Database.Query;
using seibuDatabase.Models;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace seibuDatabase.Services
{
    public class FirebaseService
    {
        private readonly FirebaseClient _firebase;
        private readonly FirebaseAuthLink _auth;
        private readonly IConfiguration _configuration;

        public FirebaseService(IConfiguration configuration)
        {
            _configuration = configuration;
            
            // Firebase設定を初期化
            var authProvider = new FirebaseAuthProvider(
                new FirebaseConfig(_configuration["Firebase:ApiKey"]));
            
            // 認証を行う（Email/Password方式）
            _auth = authProvider.SignInWithEmailAndPasswordAsync(
                _configuration["Firebase:AuthEmail"],
                _configuration["Firebase:AuthPassword"]).Result;

            // 認証付きのFirebaseClientを初期化
            _firebase = new FirebaseClient(
                _configuration["Firebase:DatabaseUrl"],
                new FirebaseOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(_auth.FirebaseToken)
                });
        }

        public async Task AddMessage(string name, string message)
        {
            // 入力値のサニタイズ（XSS対策）
            var sanitizedName = System.Web.HttpUtility.HtmlEncode(name);
            var sanitizedMessage = System.Web.HttpUtility.HtmlEncode(message);

            await _firebase
              .Child("messages")
              .PostAsync(new { 
                  name = sanitizedName, 
                  message = sanitizedMessage, 
                  timestamp = DateTime.UtcNow 
              });
        }

        public async Task<List<Message>> GetMessages()
        {
            var messages = await _firebase
              .Child("messages")
              .OrderBy("timestamp")
              .OnceAsync<Message>();

            return messages.Select(x => x.Object).ToList();
        }

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

        public async Task UpdateDonCounter(bool isDon, string updatedBy)
        {
            // 更新者のサニタイズ
            var sanitizedUpdatedBy = System.Web.HttpUtility.HtmlEncode(updatedBy);

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
            currentCounter.lastUpdatedBy = sanitizedUpdatedBy;

            await _firebase
                .Child("donCounter")
                .PutAsync(currentCounter);
        }

        public async Task ResetDonCounter(string resetBy)
        {
            // リセット実行者のサニタイズ
            var sanitizedResetBy = System.Web.HttpUtility.HtmlEncode(resetBy);

            var resetCounter = new DonCounter
            {
                donCount = 0,
                nonDonCount = 0,
                lastUpdated = DateTime.UtcNow,
                lastUpdatedBy = sanitizedResetBy
            };

            await _firebase
                .Child("donCounter")
                .PutAsync(resetCounter);
        }
    }
}
