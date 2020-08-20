using MedicalOfficeApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MedicalOfficeApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options)
            : base(options) { }

        public virtual DbSet<DbRecord> Records { get; set; }
        public virtual DbSet<Client> Clients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbRecord>()
                .Property(r => r.RowVersion)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken()
                .HasDefaultValueSql("STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')");

            modelBuilder.Entity<DbRecord>()
                .Property(r => r.TimeCreated)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<DbRecord>()
                .HasIndex(p => new { p.Date, p.Time })
                .IsUnique();
        }
    }
}
