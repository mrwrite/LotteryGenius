using Microsoft.EntityFrameworkCore.Migrations;

namespace LotteryGenius.API.Migrations
{
    public partial class IsPicked : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isPicked",
                table: "PowerPicks",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isPicked",
                table: "PowerPicks");
        }
    }
}
