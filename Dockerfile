# ビルド用ステージ
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# プロジェクトファイルをコピーしてパッケージ復元
COPY *.csproj ./
RUN dotnet restore

# 必要な Firebase パッケージを追加（.csproj にまだ含まれていない場合）
RUN dotnet add package FirebaseDatabase.net --version 5.0.0
RUN dotnet add package FirebaseAuthentication.net --version 4.1.0
RUN dotnet add package Firebase.Auth --version 1.0.0

# 残りのアプリケーションファイルをコピー
COPY . .

# プロジェクトを公開
RUN dotnet publish -c Release -o /app/publish

# 実行用ステージ
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

# 環境変数（注意：本番では secrets や環境変数管理サービスを使用）
ENV FIREBASE_API_KEY=AIzaSyAQm6zlL2FQkYUKj_yjGKgytN4vQuLtNak
ENV FIREBASE_ADMIN_EMAIL=admin@seibu.local
ENV FIREBASE_ADMIN_PASSWORD=Oneshota@3150
ENV ASPNETCORE_URLS=http://+:8080

EXPOSE 8080

ENTRYPOINT ["dotnet", "Fukuinct2025.dll"]
