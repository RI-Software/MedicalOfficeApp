using Microsoft.EntityFrameworkCore.Migrations;

namespace MedicalOfficeApp.API.Migrations
{
    public partial class AddStatusToRecord : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Records",
                nullable: false,
                defaultValue: "New");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Records");
        }
    }
}
