using MedicalOfficeApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MedicalOfficeApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options)
            : base(options) { }

        public virtual DbSet<Record> Records { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Time> Times { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Record>()
                .Property(r => r.RowVersion)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<Record>()
                .HasIndex(p => new { p.RecordDate, p.TimeId })
                .IsUnique();

            modelBuilder.Entity<Time>()
                .HasIndex(t => t.PossibleTime)
                .IsUnique(); //does not work
        }
    }
}
