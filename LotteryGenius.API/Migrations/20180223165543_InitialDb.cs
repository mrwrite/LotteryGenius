using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace LotteryGenius.API.Migrations
{
    public partial class InitialDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Megamillions",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ball1 = table.Column<string>(maxLength: 2, nullable: true),
                    ball2 = table.Column<string>(maxLength: 2, nullable: true),
                    ball3 = table.Column<string>(maxLength: 2, nullable: true),
                    ball4 = table.Column<string>(maxLength: 2, nullable: true),
                    ball5 = table.Column<string>(maxLength: 2, nullable: true),
                    created_on = table.Column<DateTime>(nullable: false),
                    draw_date = table.Column<DateTime>(nullable: false),
                    jackpot = table.Column<string>(nullable: true),
                    megaball = table.Column<string>(maxLength: 2, nullable: true),
                    megaplier = table.Column<string>(maxLength: 2, nullable: true),
                    modified_on = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Megamillions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Powerballs",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ball1 = table.Column<string>(maxLength: 2, nullable: true),
                    ball2 = table.Column<string>(maxLength: 2, nullable: true),
                    ball3 = table.Column<string>(maxLength: 2, nullable: true),
                    ball4 = table.Column<string>(maxLength: 2, nullable: true),
                    ball5 = table.Column<string>(maxLength: 2, nullable: true),
                    created_on = table.Column<DateTime>(nullable: true),
                    draw_date = table.Column<DateTime>(nullable: true),
                    jackpot = table.Column<string>(nullable: true),
                    modified_on = table.Column<DateTime>(nullable: true),
                    powerball = table.Column<string>(maxLength: 2, nullable: true),
                    powerplay = table.Column<string>(maxLength: 2, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Powerballs", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Megamillions");

            migrationBuilder.DropTable(
                name: "Powerballs");
        }
    }
}
