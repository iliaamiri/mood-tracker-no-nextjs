using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BackendMoodTrackerApi.DatabaseAccessLayer.MoodTracker
{
    public partial class moodTrackerContext : DbContext
    {
        public moodTrackerContext()
        {
        }

        public moodTrackerContext(DbContextOptions<moodTrackerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Mood> Moods { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Mood>(entity =>
            {
                entity.ToTable("mood");

                entity.Property(e => e.MoodId).HasColumnName("moodId");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("createdAt");

                entity.Property(e => e.FeelingText)
                    .HasMaxLength(64)
                    .HasColumnName("feelingText");

                entity.Property(e => e.Rating).HasColumnName("rating");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
