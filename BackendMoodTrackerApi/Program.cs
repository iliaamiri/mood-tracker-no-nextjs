using BackendMoodTrackerApi.DatabaseAccessLayer.MoodTracker;
using BackendMoodTrackerApi.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options => { options.AddPolicy(name: "_myAllowSpecificOrigins", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowCredentials();
    }); 
});

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

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();