# ビルド用ステージ
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# プロジェクトファイルを最初にコピーして復元
COPY *.csproj .
RUN dotnet restore

# 残りのファイルをコピー
COPY . .

# パッケージの更新
RUN dotnet add package FirebaseDatabase.net --version 5.0.0
RUN dotnet add package FirebaseAuthentication.net --version 4.1.0

# プロジェクトを公開
RUN dotnet publish -c Release -o /app/publish

# 実行ステージ
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# ビルドステージから公開出力をコピー
COPY --from=build /app/publish .

# 環境変数（本番環境ではより安全な方法を使用）
ENV FIREBASE_API_KEY=AIzaSyAQm6zlL2FQkYUKj_yjGKgytN4vQuLtNak
ENV FIREBASE_ADMIN_EMAIL=admin@seibu.local
ENV FIREBASE_ADMIN_PASSWORD=Oneshota@3150
ENV ASPNETCORE_URLS=http://+:8080

EXPOSE 8080

ENTRYPOINT ["dotnet", "Fukuinct2025.dll"]
