using Microsoft.EntityFrameworkCore.Migrations;

namespace LotteryGenius.API.Migrations
{
    public partial class MegaIsPicked : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isPicked",
                table: "MegaPicks",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isPicked",
                table: "MegaPicks");
        }
    }
}
