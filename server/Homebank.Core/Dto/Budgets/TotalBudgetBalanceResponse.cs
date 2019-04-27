using System;
using System.Collections.Generic;
using System.Text;

namespace Homebank.Core.Dto.Budgets
{
    public class TotalBudgetBalanceResponse
    {
        public decimal FundsAvailable { get; set; }
        public decimal OverspentLastMonth { get; set; }
        public decimal BudgetedThisMonth { get; set; }
        public decimal BudgetedInTheFuture { get; set; }
        public decimal Balance => FundsAvailable - OverspentLastMonth - BudgetedThisMonth - BudgetedInTheFuture;

        public TotalBudgetBalanceResponse(decimal fundsAvailable, decimal overspentLastMonth, decimal budgetedThisMonth, decimal budgetedInTheFuture)
        {
            FundsAvailable = fundsAvailable;
            OverspentLastMonth = overspentLastMonth;
            BudgetedThisMonth = budgetedThisMonth;
            BudgetedInTheFuture = budgetedInTheFuture;
        }
    }
}
