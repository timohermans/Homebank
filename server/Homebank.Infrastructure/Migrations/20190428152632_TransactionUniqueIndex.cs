using Microsoft.EntityFrameworkCore.Migrations;

namespace Homebank.Infrastructure.Migrations
{
    public partial class TransactionUniqueIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Payee",
                table: "Transactions",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Memo",
                table: "Transactions",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_Date_Payee_Memo_Inflow_OutFlow",
                table: "Transactions",
                columns: new[] { "Date", "Payee", "Memo", "Inflow", "OutFlow" },
                unique: true,
                filter: "[Payee] IS NOT NULL AND [Memo] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Transactions_Date_Payee_Memo_Inflow_OutFlow",
                table: "Transactions");

            migrationBuilder.AlterColumn<string>(
                name: "Payee",
                table: "Transactions",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Memo",
                table: "Transactions",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
