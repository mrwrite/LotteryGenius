using Microsoft.EntityFrameworkCore.Migrations;

namespace LotteryGenius.API.Migrations
{
    public partial class PickId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "pick_id",
                table: "PowerPicks",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "pick_id",
                table: "PowerPicks");
        }
    }
}
