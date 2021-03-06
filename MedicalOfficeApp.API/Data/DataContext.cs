﻿using MedicalOfficeApp.API.Data.Models;
using MedicalOfficeApp.API.Models;
using MedicalOfficeApp.API.Shared;
using Microsoft.EntityFrameworkCore;

namespace MedicalOfficeApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options)
            : base(options) { }

        public virtual DbSet<DbRecord> Records { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Admin> Admins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbRecord>()
                .Property(r => r.TimeCreated)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<DbRecord>()
                .HasIndex(p => new { p.Date, p.Time })
                .IsUnique();

            modelBuilder.Entity<DbRecord>()
                .Property(r => r.Status)
                .HasDefaultValue(RecordStatuses.New.ToString().ToLower());

            modelBuilder.Entity<DbRecord>()
              .Property(r => r.Status)
              .HasDefaultValue(RecordStatuses.New.ToString())
              .HasConversion(
                s => s.ToLower(),
                s => s);

            modelBuilder.Entity<Admin>()
                .Property(a => a.TimeCreated)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<Admin>()
                .HasIndex(a => a.Username)
                .IsUnique();
        }
    }
}
