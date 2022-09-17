using System;
using System.Collections.Generic;

namespace BackendMoodTrackerApi.DatabaseAccessLayer.MoodTracker
{
    public partial class Mood
    {
        public int MoodId { get; set; }
        public string FeelingText { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public int Rating { get; set; }
    }
}
