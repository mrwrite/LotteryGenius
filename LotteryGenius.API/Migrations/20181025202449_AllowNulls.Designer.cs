﻿// <auto-generated />
using LotteryGenius.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace LotteryGenius.API.Migrations
{
    [DbContext(typeof(LotteryGeniusContext))]
    [Migration("20181025202449_AllowNulls")]
    partial class AllowNulls
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("LotteryGenius.API.Data.Entities.LotteryGeniusUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.Property<bool>("initialLogin");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("LotteryGenius.API.Data.Entities.Megamillion", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ball1")
                        .HasMaxLength(2);

                    b.Property<string>("ball2")
                        .HasMaxLength(2);

                    b.Property<string>("ball3")
                        .HasMaxLength(2);

                    b.Property<string>("ball4")
                        .HasMaxLength(2);

                    b.Property<string>("ball5")
                        .HasMaxLength(2);

                    b.Property<DateTime?>("created_on");

                    b.Property<DateTime>("draw_date");

                    b.Property<string>("jackpot");

                    b.Property<string>("megaball")
                        .HasMaxLength(2);

                    b.Property<string>("megaplier")
                        .HasMaxLength(2);

                    b.Property<DateTime?>("modified_on");

                    b.HasKey("id");

                    b.ToTable("Megamillions");
                });

            modelBuilder.Entity("LotteryGenius.API.Data.Entities.MegamillionPicks", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ball1")
                        .HasMaxLength(2);

                    b.Property<string>("ball2")
                        .HasMaxLength(2);

                    b.Property<string>("ball3")
                        .HasMaxLength(2);

                    b.Property<string>("ball4")
                        .HasMaxLength(2);

                    b.Property<string>("ball5")
                        .HasMaxLength(2);

                    b.Property<string>("megaball")
                        .HasMaxLength(2);

                    b.Property<int?>("megamillion_id");

                    b.Property<string>("megaplier")
                        .HasMaxLength(2);

                    b.Property<DateTime>("pick_date");

                    b.HasKey("id");

                    b.ToTable("MegaPicks");
                });

            modelBuilder.Entity("LotteryGenius.API.Data.Entities.MegamillionWinners", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ball1")
                        .HasMaxLength(2);

                    b.Property<string>("ball2")
                        .HasMaxLength(2);

                    b.Property<string>("ball3")
                        .HasMaxLength(2);

                    b.Property<string>("ball4")
                        .HasMaxLength(2);

                    b.Property<string>("ball5")
                        .HasMaxLength(2);

                    b.Property<bool>("isDisplayed");

                    b.Property<string>("megaball")
                        .HasMaxLength(2);

                    b.Property<int>("megamillion_id");

                    b.Property<string>("megaplier")
                        .HasMaxLength(2);

                    b.Property<DateTime>("pick_date");

                    b.Property<int>("pick_id");

                    b.Property<int>("prize_id");

                    b.HasKey("id");

                    b.ToTable("MegaWinners");
                });

            modelBuilder.Entity("LotteryGenius.API.Data.Entities.NextPowerball", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("modified_on");

                    b.Property<string>("next_jackpot");

                    b.Property<DateTime>("next_jackpot_date");

                    b.HasKey("id");

                    b.ToTable("NextPowerball");
                });

            modelBuilder.Entity("LotteryGenius.API.Data.Entities.Powerball", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ball1")
                        .HasMaxLength(2);

                    b.Property<string>("ball2")
                        .HasMaxLength(2);

                    b.Property<string>("ball3")
                        .HasMaxLength(2);

                    b.Property<string>("ball4")
                        .HasMaxLength(2);

                    b.Property<string>("ball5")
                        .HasMaxLength(2);

                    b.Property<DateTime?>("created_on");

                    b.Property<DateTime?>("draw_date");

                    b.Property<string>("jackpot");

                    b.Property<DateTime?>("modified_on");

                    b.Property<string>("powerball")
                        .HasMaxLength(2);

                    b.Property<string>("powerplay")
                        .HasMaxLength(2);

                    b.HasKey("id");

                    b.ToTable("Powerballs");
                });

            modelBuilder.Entity("LotteryGenius.API.Data.Entities.PowerballPicks", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ball1")
                        .HasMaxLength(2);

                    b.Property<string>("ball2")
                        .HasMaxLength(2);

                    b.Property<string>("ball3")
                        .HasMaxLength(2);

                    b.Property<string>("ball4")
                        .HasMaxLength(2);

                    b.Property<string>("ball5")
                        .HasMaxLength(2);

                    b.Property<DateTime?>("pick_date");

                    b.Property<string>("powerball")
                        .HasMaxLength(2);

                    b.Property<int?>("powerball_id");

                    b.Property<string>("powerplay")
                        .HasMaxLength(2);

                    b.HasKey("id");

                    b.ToTable("PowerPicks");
                });

            modelBuilder.Entity("LotteryGenius.API.Data.Entities.PowerballPrize", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("description");

                    b.Property<decimal>("prize");

                    b.HasKey("id");

                    b.ToTable("PowerballPrize");
                });

            modelBuilder.Entity("LotteryGenius.API.Data.Entities.PowerballWinners", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ball1")
                        .HasMaxLength(2);

                    b.Property<string>("ball2")
                        .HasMaxLength(2);

                    b.Property<string>("ball3")
                        .HasMaxLength(2);

                    b.Property<string>("ball4")
                        .HasMaxLength(2);

                    b.Property<string>("ball5")
                        .HasMaxLength(2);

                    b.Property<bool>("isDisplayed");

                    b.Property<DateTime>("pick_date");

                    b.Property<int>("pick_id");

                    b.Property<string>("powerball")
                        .HasMaxLength(2);

                    b.Property<int>("powerball_id");

                    b.Property<string>("powerplay")
                        .HasMaxLength(2);

                    b.Property<int>("prize_id");

                    b.HasKey("id");

                    b.ToTable("PowerWinners");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<int>("UserId");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("UserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("UserTokens");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<int>")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("LotteryGenius.API.Data.Entities.LotteryGeniusUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("LotteryGenius.API.Data.Entities.LotteryGeniusUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<int>")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("LotteryGenius.API.Data.Entities.LotteryGeniusUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("LotteryGenius.API.Data.Entities.LotteryGeniusUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
