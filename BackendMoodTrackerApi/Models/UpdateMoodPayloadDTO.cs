namespace BackendMoodTrackerApi.Models;

public class UpdateMoodPayloadDTO
{
    public int MoodId { get; set; }
    public int Rating { get; set; }
    public string FeelingText { get; set; }
}