using BackendMoodTrackerApi.DatabaseAccessLayer.MoodTracker;
using BackendMoodTrackerApi.Models;

namespace BackendMoodTrackerApi.Services;

public interface IMoodRepository
{
    public Task<Mood[]> GetAll();

    public Task<Mood?> GetOne(int moodId);

    public Task<Mood> Update(UpdateMoodPayloadDTO updateMoodPayloadDTO);

    public Task<Mood> Add(AddMoodPayloadDTO newMood);

    public Task Remove(int moodId);
}