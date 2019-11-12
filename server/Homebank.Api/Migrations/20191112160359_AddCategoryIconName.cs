using Microsoft.EntityFrameworkCore.Migrations;

namespace Homebank.Api.Migrations
{
    public partial class AddCategoryIconName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IconName",
                table: "Categories",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IconName",
                table: "Categories");
        }
    }
}
