# SDK イメージでビルド
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# プロジェクトファイルをコピーしてリストア・ビルド
COPY . ./
RUN dotnet publish -c Release -o out

# 実行環境イメージ
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# ポートの指定（RailwayのPORT環境変数を使う）
ENV ASPNETCORE_URLS=http://+:${PORT}
EXPOSE 8000

ENTRYPOINT ["dotnet", "fukui-nct-2025-08.dll"]
