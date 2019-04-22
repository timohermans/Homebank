using Homebank.Core.Domain.Entities;
using Homebank.Core.Dto.Budgets;
using Homebank.Core.Extensions;
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
        private IQueryable<Budget> Budgets => Entities
                    .Include(budget => budget.Category.Transactions)
                    .Include(budget => budget.Category.CategoryGroup);

        public BudgetRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Budget> GetByAsync(int categoryId, DateTime month)
        {
            var budgetFound = await Budgets.FirstOrDefaultAsync(budget => budget.MonthForBudget.IsSameMonthAndYear(month)
                                            && budget.Category.Id == categoryId);

            budgetFound?.Category.EnsureTransactionsAreFrom(month);

            return budgetFound;
        }

        public async Task<IList<Budget>> GetWithTransactionsBy(DateTime month)
        {
            var budgets = await Budgets
                    .AsNoTracking()
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