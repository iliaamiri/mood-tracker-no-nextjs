FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["BackendMoodTrackerApi.csproj", "./"]
RUN dotnet restore "BackendMoodTrackerApi.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "BackendMoodTrackerApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BackendMoodTrackerApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BackendMoodTrackerApi.dll"]
