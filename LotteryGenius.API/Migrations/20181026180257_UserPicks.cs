using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace LotteryGenius.API.Migrations
{
    public partial class UserPicks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserPicks",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ball1 = table.Column<string>(nullable: true),
                    ball2 = table.Column<string>(nullable: true),
                    ball3 = table.Column<string>(nullable: true),
                    ball4 = table.Column<string>(nullable: true),
                    ball5 = table.Column<string>(nullable: true),
                    game_id = table.Column<int>(nullable: false),
                    lotto_id = table.Column<int>(nullable: false),
                    lottoball = table.Column<string>(nullable: true),
                    multiplier = table.Column<string>(nullable: true),
                    saved_date = table.Column<DateTime>(nullable: true),
                    user_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPicks", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserPicks");
        }
    }
}
