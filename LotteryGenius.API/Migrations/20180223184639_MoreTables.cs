using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace LotteryGenius.API.Migrations
{
    public partial class MoreTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MegaPicks",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ball1 = table.Column<string>(maxLength: 2, nullable: true),
                    ball2 = table.Column<string>(maxLength: 2, nullable: true),
                    ball3 = table.Column<string>(maxLength: 2, nullable: true),
                    ball4 = table.Column<string>(maxLength: 2, nullable: true),
                    ball5 = table.Column<string>(maxLength: 2, nullable: true),
                    megaball = table.Column<string>(maxLength: 2, nullable: true),
                    megamillion_id = table.Column<int>(nullable: false),
                    megaplier = table.Column<string>(maxLength: 2, nullable: true),
                    pick_date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MegaPicks", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "MegaWinners",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ball1 = table.Column<string>(maxLength: 2, nullable: true),
                    ball2 = table.Column<string>(maxLength: 2, nullable: true),
                    ball3 = table.Column<string>(maxLength: 2, nullable: true),
                    ball4 = table.Column<string>(maxLength: 2, nullable: true),
                    ball5 = table.Column<string>(maxLength: 2, nullable: true),
                    isDisplayed = table.Column<bool>(nullable: false),
                    megaball = table.Column<string>(maxLength: 2, nullable: true),
                    megamillion_id = table.Column<int>(nullable: false),
                    megaplier = table.Column<string>(maxLength: 2, nullable: true),
                    pick_date = table.Column<DateTime>(nullable: false),
                    pick_id = table.Column<int>(nullable: false),
                    prize_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MegaWinners", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "PowerPicks",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ball1 = table.Column<string>(maxLength: 2, nullable: true),
                    ball2 = table.Column<string>(maxLength: 2, nullable: true),
                    ball3 = table.Column<string>(maxLength: 2, nullable: true),
                    ball4 = table.Column<string>(maxLength: 2, nullable: true),
                    ball5 = table.Column<string>(maxLength: 2, nullable: true),
                    pick_date = table.Column<DateTime>(nullable: false),
                    powerball = table.Column<string>(maxLength: 2, nullable: true),
                    powerball_id = table.Column<int>(nullable: false),
                    powerplay = table.Column<string>(maxLength: 2, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PowerPicks", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "PowerWinners",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ball1 = table.Column<string>(maxLength: 2, nullable: true),
                    ball2 = table.Column<string>(maxLength: 2, nullable: true),
                    ball3 = table.Column<string>(maxLength: 2, nullable: true),
                    ball4 = table.Column<string>(maxLength: 2, nullable: true),
                    ball5 = table.Column<string>(maxLength: 2, nullable: true),
                    isDisplayed = table.Column<bool>(nullable: false),
                    pick_date = table.Column<DateTime>(nullable: false),
                    pick_id = table.Column<int>(nullable: false),
                    powerball = table.Column<string>(maxLength: 2, nullable: true),
                    powerball_id = table.Column<int>(nullable: false),
                    powerplay = table.Column<string>(maxLength: 2, nullable: true),
                    prize_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PowerWinners", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MegaPicks");

            migrationBuilder.DropTable(
                name: "MegaWinners");

            migrationBuilder.DropTable(
                name: "PowerPicks");

            migrationBuilder.DropTable(
                name: "PowerWinners");
        }
    }
}
