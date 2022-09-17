using BackendMoodTrackerApi.DatabaseAccessLayer.MoodTracker;
using BackendMoodTrackerApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendMoodTrackerApi.Services;

public class MoodRepository : IMoodRepository
{
    private readonly IServiceProvider _serviceProvider;

    public MoodRepository(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
    
    public async Task<Mood[]> GetAll()
    {
        await using (var db = new moodTrackerContext(
                         _serviceProvider.GetRequiredService<DbContextOptions<moodTrackerContext>>()))
        {
            return db.Moods.ToArray();
        }
    }

    public async Task<Mood?> GetOne(int moodId)
    {
        await using (var db = new moodTrackerContext(_serviceProvider
                         .GetRequiredService<DbContextOptions<moodTrackerContext>>()))
        {
            return (await db.Moods.SingleOrDefaultAsync(m => m.MoodId == moodId));
        }
    }

    public async Task<Mood> Update(UpdateMoodPayloadDTO updateMoodPayloadDTO)
    {
        await using (var db = new moodTrackerContext(_serviceProvider
                         .GetRequiredService<DbContextOptions<moodTrackerContext>>()))
        {
            var mood = await GetOne(updateMoodPayloadDTO.MoodId);
            if (mood == null)
            {
                throw new Exception("Mood doesn't exist!");
            }

            mood.Rating = updateMoodPayloadDTO.Rating;
            mood.FeelingText = updateMoodPayloadDTO.FeelingText;
            
            db.Update(mood);
            await db.SaveChangesAsync();

            return mood;
        }
    }

    public async Task<Mood> Add(AddMoodPayloadDTO newMood)
    {
        await using (var db = new moodTrackerContext(_serviceProvider
                         .GetRequiredService<DbContextOptions<moodTrackerContext>>()))
        {
            var result = await db.Moods.AddAsync(new Mood()
            {
                FeelingText = newMood.FeelingText,
                Rating = newMood.Rating,
                CreatedAt = DateTime.Now
            });
            await db.SaveChangesAsync();
            return result.Entity;
        }
    }

    public async Task Remove(int moodId)
    {
        await using (var db = new moodTrackerContext(_serviceProvider
                         .GetRequiredService<DbContextOptions<moodTrackerContext>>()))
        {
            var moodToDelete = new Mood() { MoodId = moodId };
            db.Moods.Attach(moodToDelete);
            db.Moods.Remove(moodToDelete);
            await db.SaveChangesAsync();
        }
    }
}