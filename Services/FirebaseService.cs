using Firebase.Database;
using Firebase.Database.Query;
using Firebase.Auth;
using seibuDatabase.Models;

namespace seibuDatabase.Services
{
    public class FirebaseService
    {
        private readonly FirebaseClient _firebase;
        private readonly FirebaseAuthProvider _authProvider;
        private string _authToken;

        public FirebaseService()
        {
            var apiKey = Environment.GetEnvironmentVariable("FIREBASE_API_KEY") ?? "your-firebase-api-key-here";
            _authProvider = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
            _firebase = new FirebaseClient("https://seibudatabase-default-rtdb.firebaseio.com/");
        }

        // 匿名認証でユーザーを認証
        private async Task<string> GetAuthTokenAsync()
        {
            if (string.IsNullOrEmpty(_authToken))
            {
                try
                {
                    var auth = await _authProvider.SignInAnonymouslyAsync();
                    _authToken = auth.FirebaseToken;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"認証エラー: {ex.Message}");
                    throw;
                }
            }
            return _authToken;
        }

        // 管理者として認証（丼カウンター用）
        private async Task<string> GetAdminAuthTokenAsync()
        {
            try
            {
                var adminEmail = Environment.GetEnvironmentVariable("FIREBASE_ADMIN_EMAIL") ?? "admin@seibu.local";
                var adminPassword = Environment.GetEnvironmentVariable("FIREBASE_ADMIN_PASSWORD") ?? "seibu2025admin";
                
                var auth = await _authProvider.SignInWithEmailAndPasswordAsync(adminEmail, adminPassword);
                return auth.FirebaseToken;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"管理者認証エラー: {ex.Message}");
                // 管理者アカウントが存在しない場合は作成
                try
                {
                    var adminEmail = Environment.GetEnvironmentVariable("FIREBASE_ADMIN_EMAIL") ?? "admin@seibu.local";
                    var adminPassword = Environment.GetEnvironmentVariable("FIREBASE_ADMIN_PASSWORD") ?? "seibu2025admin";
                    
                    var newAuth = await _authProvider.CreateUserWithEmailAndPasswordAsync(adminEmail, adminPassword);
                    return newAuth.FirebaseToken;
                }
                catch (Exception createEx)
                {
                    Console.WriteLine($"管理者アカウント作成エラー: {createEx.Message}");
                    throw;
                }
            }
        }

        public async Task AddMessage(string name, string message)
        {
            try
            {
                var token = await GetAuthTokenAsync();
                await _firebase
                    .Child("messages")
                    .AuthWith(token)
                    .PostAsync(new { name = name, message = message, timestamp = DateTime.UtcNow });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"メッセージ追加エラー: {ex.Message}");
                // 認証なしで試行
                await _firebase
                    .Child("messages")
                    .PostAsync(new { name = name, message = message, timestamp = DateTime.UtcNow });
            }
        }

        public async Task<List<Message>> GetMessages()
        {
            try
            {
                var token = await GetAuthTokenAsync();
                var messages = await _firebase
                    .Child("messages")
                    .AuthWith(token)
                    .OrderBy("timestamp")
                    .OnceAsync<Message>();

                return messages.Select(x => x.Object).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"メッセージ取得エラー: {ex.Message}");
                // 認証なしで試行
                try
                {
                    var messages = await _firebase
                        .Child("messages")
                        .OrderBy("timestamp")
                        .OnceAsync<Message>();

                    return messages.Select(x => x.Object).ToList();
                }
                catch
                {
                    return new List<Message>();
                }
            }
        }

        // 丼カウンターを取得
        public async Task<DonCounter> GetDonCounter()
        {
            try
            {
                var token = await GetAuthTokenAsync();
                var counter = await _firebase
                    .Child("donCounter")
                    .AuthWith(token)
                    .OnceSingleAsync<DonCounter>();
                
                return counter ?? new DonCounter 
                { 
                    donCount = 0, 
                    nonDonCount = 0, 
                    lastUpdated = DateTime.UtcNow,
                    lastUpdatedBy = "system"
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"丼カウンター取得エラー: {ex.Message}");
                // 認証なしで試行
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
        }

        // 丼カウンターを更新（管理者権限が必要）
        public async Task UpdateDonCounter(bool isDon, string updatedBy)
        {
            try
            {
                var adminToken = await GetAdminAuthTokenAsync();
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
                    .AuthWith(adminToken)
                    .PutAsync(currentCounter);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"丼カウンター更新エラー: {ex.Message}");
                // 認証なしで試行
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
        }

        // カウンターをリセット（管理者権限が必要）
        public async Task ResetDonCounter(string resetBy)
        {
            try
            {
                var adminToken = await GetAdminAuthTokenAsync();
                var resetCounter = new DonCounter
                {
                    donCount = 0,
                    nonDonCount = 0,
                    lastUpdated = DateTime.UtcNow,
                    lastUpdatedBy = resetBy
                };

                await _firebase
                    .Child("donCounter")
                    .AuthWith(adminToken)
                    .PutAsync(resetCounter);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"カウンターリセットエラー: {ex.Message}");
                // 認証なしで試行
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
}
