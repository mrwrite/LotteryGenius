using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LotteryGenius.API.Migrations
{
    public partial class RemoveMultiplier : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "multiplier",
                table: "UserPicks");

            migrationBuilder.AddColumn<float>(
                name: "prize_amount",
                table: "PowerWinners",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AlterColumn<DateTime>(
                name: "draw_date",
                table: "Powerballs",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AddColumn<float>(
                name: "prize_amount",
                table: "MegaWinners",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "prize_amount",
                table: "PowerWinners");

            migrationBuilder.DropColumn(
                name: "prize_amount",
                table: "MegaWinners");

            migrationBuilder.AddColumn<string>(
                name: "multiplier",
                table: "UserPicks",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "draw_date",
                table: "Powerballs",
                nullable: true,
                oldClrType: typeof(DateTime));
        }
    }
}
