using Microsoft.EntityFrameworkCore.Migrations;

namespace LotteryGenius.API.Migrations
{
    public partial class UserPickId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "lotto_id",
                table: "UserPicks",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "pick_id",
                table: "UserPicks",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "pick_id",
                table: "UserPicks");

            migrationBuilder.AlterColumn<int>(
                name: "lotto_id",
                table: "UserPicks",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
