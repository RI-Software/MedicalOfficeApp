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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Record>()
                .Property(r => r.RowVersion)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken()
                .HasDefaultValueSql("STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')");

            modelBuilder.Entity<Record>()
                .Property(r => r.TimeCreated)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<Record>()
                .HasIndex(p => new { p.Date, p.Time })
                .IsUnique();

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken()
                .HasDefaultValue("user");
        }
    }
}
