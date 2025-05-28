using Firebase.Database;
using Firebase.Database.Query;
using Firebase.Auth;
using seibuDatabase.Models;

namespace seibuDatabase.Services
{
    public class FirebaseService
    {
        private readonly string _databaseUrl = "https://seibudatabase-default-rtdb.firebaseio.com/";
        private readonly FirebaseAuthProvider _authProvider;
        private string? _authToken;
        private string? _adminToken;

        public FirebaseService()
        {
            var apiKey = Environment.GetEnvironmentVariable("FIREBASE_API_KEY") ?? "your-firebase-api-key-here";
            _authProvider = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
        }

        // Create Firebase client with authentication
        private FirebaseClient GetAuthenticatedClient(string authToken)
        {
            return new FirebaseClient(
                _databaseUrl,
                new FirebaseOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(authToken)
                }
            );
        }

        // Create Firebase client without authentication (read-only for public data)
        private FirebaseClient GetPublicClient()
        {
            return new FirebaseClient(_databaseUrl);
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
                    Console.WriteLine($"匿名認証エラー: {ex.Message}");
                    throw;
                }
            }
            return _authToken;
        }

        // 管理者として認証（丼カウンター用）
        private async Task<string> GetAdminAuthTokenAsync()
        {
            if (string.IsNullOrEmpty(_adminToken))
            {
                try
                {
                    var adminEmail = Environment.GetEnvironmentVariable("FIREBASE_ADMIN_EMAIL") ?? "admin@seibu.local";
                    var adminPassword = Environment.GetEnvironmentVariable("FIREBASE_ADMIN_PASSWORD") ?? "seibu2025admin";
                    
                    var auth = await _authProvider.SignInWithEmailAndPasswordAsync(adminEmail, adminPassword);
                    _adminToken = auth.FirebaseToken;
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
                        _adminToken = newAuth.FirebaseToken;
                    }
                    catch (Exception createEx)
                    {
                        Console.WriteLine($"管理者アカウント作成エラー: {createEx.Message}");
                        throw;
                    }
                }
            }
            return _adminToken;
        }

        // メッセージを追加（匿名認証で実行）
        public async Task AddMessage(string name, string message)
        {
            try
            {
                // 入力検証
                if (string.IsNullOrWhiteSpace(name) || name.Length > 50)
                {
                    throw new ArgumentException("名前は1文字以上50文字以下で入力してください。");
                }
                
                if (string.IsNullOrWhiteSpace(message) || message.Length > 500)
                {
                    throw new ArgumentException("メッセージは1文字以上500文字以下で入力してください。");
                }

                // HTMLタグを除去してXSS対策
                name = System.Net.WebUtility.HtmlEncode(name.Trim());
                message = System.Net.WebUtility.HtmlEncode(message.Trim());

                var token = await GetAuthTokenAsync();
                var firebase = GetAuthenticatedClient(token);
                
                await firebase
                    .Child("messages")
                    .PostAsync(new { 
                        name = name, 
                        message = message, 
                        timestamp = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
                    });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"メッセージ追加エラー: {ex.Message}");
                throw new Exception($"メッセージの投稿に失敗しました: {ex.Message}");
            }
        }

        // メッセージを取得（認証不要で実行）
        public async Task<List<Message>> GetMessages()
        {
            try
            {
                var firebase = GetPublicClient();
                var messages = await firebase
                    .Child("messages")
                    .OrderBy("timestamp")
                    .OnceAsync<Message>();

                return messages
                    .Where(x => x.Object != null)
                    .Select(x => x.Object)
                    .OrderByDescending(x => x.timestamp)
                    .Take(100) // 最新100件まで表示
                    .ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"メッセージ取得エラー: {ex.Message}");
                return new List<Message>();
            }
        }

        // 丼カウンターを取得（認証不要で実行）
        public async Task<DonCounter> GetDonCounter()
        {
            try
            {
                var firebase = GetPublicClient();
                var counter = await firebase
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
            catch (Exception ex)
            {
                Console.WriteLine($"丼カウンター取得エラー: {ex.Message}");
                return new DonCounter 
                { 
                    donCount = 0, 
                    nonDonCount = 0, 
                    lastUpdated = DateTime.UtcNow,
                    lastUpdatedBy = "system"
                };
            }
        }

        // 丼カウンターを更新（管理者権限が必要）
        public async Task UpdateDonCounter(bool isDon, string updatedBy)
        {
            try
            {
                // 入力検証
                if (string.IsNullOrWhiteSpace(updatedBy))
                {
                    updatedBy = "匿名";
                }
                updatedBy = System.Net.WebUtility.HtmlEncode(updatedBy.Trim());

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

                var firebase = GetAuthenticatedClient(adminToken);
                await firebase
                    .Child("donCounter")
                    .PutAsync(currentCounter);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"丼カウンター更新エラー: {ex.Message}");
                throw new Exception($"丼カウンターの更新に失敗しました: {ex.Message}");
            }
        }

        // カウンターをリセット（管理者権限が必要）
        public async Task ResetDonCounter(string resetBy)
        {
            try
            {
                // 入力検証
                if (string.IsNullOrWhiteSpace(resetBy))
                {
                    resetBy = "匿名";
                }
                resetBy = System.Net.WebUtility.HtmlEncode(resetBy.Trim());

                var adminToken = await GetAdminAuthTokenAsync();
                var resetCounter = new DonCounter
                {
                    donCount = 0,
                    nonDonCount = 0,
                    lastUpdated = DateTime.UtcNow,
                    lastUpdatedBy = resetBy
                };

                var firebase = GetAuthenticatedClient(adminToken);
                await firebase
                    .Child("donCounter")
                    .PutAsync(resetCounter);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"カウンターリセットエラー: {ex.Message}");
                throw new Exception($"カウンターのリセットに失敗しました: {ex.Message}");
            }
        }

        // 管理者用：メッセージを削除
        public async Task DeleteMessage(string messageId)
        {
            try
            {
                var adminToken = await GetAdminAuthTokenAsync();
                var firebase = GetAuthenticatedClient(adminToken);
                
                await firebase
                    .Child("messages")
                    .Child(messageId)
                    .DeleteAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"メッセージ削除エラー: {ex.Message}");
                throw new Exception($"メッセージの削除に失敗しました: {ex.Message}");
            }
        }
    }
}
