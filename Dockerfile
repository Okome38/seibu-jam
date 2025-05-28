# ビルド用ステージ
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY . ./
RUN dotnet publish -c Release -o out

# 実行ステージ
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Environment variables
ENV FIREBASE_API_KEY=AIzaSyAQm6zlL2FQkYUKj_yjGKgytN4vQuLtNak
ENV FIREBASE_ADMIN_EMAIL=admin@seibu.local
ENV FIREBASE_ADMIN_PASSWORD=Oneshota@3150
ENV ASPNETCORE_URLS=http://+:8080

EXPOSE 8080

ENTRYPOINT ["dotnet", "Fukuinct2025.dll"]
