using Homebank.Core.Domain.Entities;
using Homebank.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homebank.Infrastructure.Repositories
{
    public class BudgetRepository : Repository<Budget>, IBudgetRepository
    {
        public BudgetRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IList<Budget>> GetWithTransactionsBy(DateTime month)
        {
            var budgets = await Entities
                    .AsNoTracking()
                    .Include(budget => budget.Category.Transactions)
                    .Include(budget => budget.Category.CategoryGroup)
                    .Where(budget => budget.MonthForBudget.Year == month.Year && budget.MonthForBudget.Month == month.Month)
                    .ToListAsync();

            RemoveTransactionsBy(month, budgets);

            return budgets;
        }

        private void RemoveTransactionsBy(DateTime month, List<Budget> budgets)
        {
            foreach (var budget in budgets)
            {
                budget.Category.EnsureTransactionsAreFrom(month);
            }
        }
    }
}