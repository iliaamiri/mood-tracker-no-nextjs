using BackendMoodTrackerApi;
using BackendMoodTrackerApi.DatabaseAccessLayer.MoodTracker;
using BackendMoodTrackerApi.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options => { options.AddPolicy(name: "_myAllowSpecificOrigins", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowCredentials();
    }); 
});

builder.Services.AddDirectoryBrowser();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContextPool<moodTrackerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("moodTracker")));

builder.Services.AddScoped<IMoodRepository, MoodRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseAuthorization();

app.UseStaticFiles();

var physicalFileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "wwwroot"));
var fileProvider = new IndexFallbackFileProvider(physicalFileProvider);

var staticFileOptions = new StaticFileOptions
{
    FileProvider = fileProvider,
    ServeUnknownFileTypes = true
};

app.UseStaticFiles(staticFileOptions);

app.MapControllers();

app.Run();