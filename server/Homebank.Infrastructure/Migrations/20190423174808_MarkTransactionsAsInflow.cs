using Microsoft.EntityFrameworkCore.Migrations;

namespace Homebank.Infrastructure.Migrations
{
    public partial class MarkTransactionsAsInflow : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsInflowForBudgeting",
                table: "Transactions",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsInflowForBudgeting",
                table: "Transactions");
        }
    }
}
