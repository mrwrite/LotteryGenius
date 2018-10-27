using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace LotteryGenius.API.Migrations
{
    public partial class GameType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "game_id",
                table: "UserPicks");

            migrationBuilder.AddColumn<string>(
                name: "game_type",
                table: "UserPicks",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "game_type",
                table: "UserPicks");

            migrationBuilder.AddColumn<int>(
                name: "game_id",
                table: "UserPicks",
                nullable: false,
                defaultValue: 0);
        }
    }
}
