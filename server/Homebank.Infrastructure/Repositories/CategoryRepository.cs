using Homebank.Core.Domain.Entities;
using Homebank.Core.Extensions;
using Homebank.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homebank.Infrastructure.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Category> GetBy(string name)
        {
            return await Entities.FirstOrDefaultAsync(category => category.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
        }

        public async Task<Category> GetWithGroupByAsync(int id)
        {
            return await Entities
                            .Include(category => category.CategoryGroup)
                            .SingleOrDefaultAsync(category => category.Id == id);
        }

        public async Task<Category> GetWithoutBudgetByAsync(int categoryId, DateTime month)
        {
            var categoryFound = await Entities
                   .Include(category => category.Transactions)
                   .Include(category => category.CategoryGroup)
                   .Where(category => category.Budgets == null
                                       || !category.Budgets.Any(budget => budget.MonthForBudget.IsSameMonthAndYear(month)))
                   .FirstOrDefaultAsync(category => category.Id == categoryId);

            categoryFound?.EnsureTransactionsAreFrom(month);

            return categoryFound;
        }

        public async Task<IEnumerable<Category>> GetWithoutBudgetsByAsync(DateTime month)
        {
            var categories = await Entities
                    .Include(category => category.Transactions)
                    .Include(category => category.CategoryGroup)
                    .Where(category => category.Budgets == null
                                        || !category.Budgets.Any(budget => budget.MonthForBudget.IsSameMonthAndYear(month)))
                    .ToListAsync();

            categories.ForEach(category => category.EnsureTransactionsAreFrom(month));

            return categories;
        }
    }
}