using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace todolist.Migrations
{
    public partial class updatedTaskSchema2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Date",
                table: "Tasks",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "Tasks",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
