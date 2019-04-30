using Homebank.Api.Domain.Entities;
using Homebank.Api.Infrastructure;
using Homebank.Api.Infrastructure.Extensions;
using Homebank.Api.UseCases;
using Homebank.Core.Domain.Entities;
using Homebank.Core.Dto.Budgets;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Api.UseCases.Budgets
{
    public static class MonthDetails
    {
        public class Query : BaseMonthRequest, IRequest<Response>
        {
        }

        public class Response
        {
            public IList<BudgetResponse> Budgets { get; set; }

            public Response(IEnumerable<Budget> budgets)
            {
                if (budgets != null)
                {
                    Budgets = MapBudgets(budgets).ToList();
                }
            }

            private IEnumerable<BudgetResponse> MapBudgets(IEnumerable<Budget> budgets)
            {
                foreach (var budget in budgets)
                {
                    yield return BudgetResponse.MapFrom(budget);
                }
            }

            public class BudgetResponse
            {
                public int Id { get; set; }
                public DateTime MonthForBudget { get; set; }
                public decimal Budgeted { get; set; }
                public int CategoryId { get; set; }
                public int CategoryGroupId { get; set; }
                public string CategoryName { get; set; }
                public string CategoryGroupName { get; set; }
                public decimal Activity { get; set; }
                public decimal Available { get; set; }

                public static BudgetResponse MapFrom(Budget budget)
                {
                    return new BudgetResponse
                    {
                        Id = budget.Id,
                        Activity = budget.Activity.GetValueOrDefault(),
                        Available = budget.Available.GetValueOrDefault(),
                        Budgeted = budget.Budgeted,
                        CategoryGroupId = budget.Category.CategoryGroup.Id,
                        CategoryGroupName = budget.Category.CategoryGroup.Name,
                        CategoryId = budget.Category.Id,
                        CategoryName = budget.Category.Name,
                        MonthForBudget = budget.MonthForBudget
                    };
                }
            }
        }

        public class UseCase : IRequestHandler<Query, Response>
        {
            private readonly AppDbContext _context;

            public UseCase(AppDbContext context)
            {
                _context = context;
            }

            public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                var transactionsWithoutCategory = await GetTransactionsUncategorizedBy(request.Month);
                var categoriesWithoutBudget = await GetCategoriesWithoutBudgetsByAsync(request.Month);
                var budgets = await GetBudgetsWithTransactionsBy(request.Month);

                var budgetsForCategoriesWithoutBudget = CreateTemporaryBudgetsFor(categoriesWithoutBudget, request.Month).ToList();
                var budgetForUncategorized = CreateTemporaryUncategorizedBudgetFrom(transactionsWithoutCategory, request.Month);

                budgets.Add(budgetForUncategorized);
                budgetsForCategoriesWithoutBudget.ForEach(budget => budgets.Add(budget));

                return new Response(budgets);
            }

            public async Task<IEnumerable<Transaction>> GetTransactionsUncategorizedBy(DateTime month)
            {
                return await _context.Transactions
                        .Include(transaction => transaction.Category.CategoryGroup)
                        .OrderByDescending(transaction => transaction.Date)
                        .Where(transaction => transaction.Date.Year == month.Year && transaction.Date.Month == month.Month
                            && transaction.Category == null)
                        .ToListAsync();
            }

            private async Task<IEnumerable<Category>> GetCategoriesWithoutBudgetsByAsync(DateTime month)
            {
                var categories = await _context.Categories
                   .Include(category => category.Transactions)
                    .Include(category => category.CategoryGroup)
                    .Where(category => category.Budgets == null
                                        || !category.Budgets.Any(budget => budget.MonthForBudget.IsSameMonthAndYear(month)))
                    .ToListAsync();

                categories.ForEach(category => category.EnsureTransactionsAreFrom(month));

                return categories;
            }

            public async Task<IList<Budget>> GetBudgetsWithTransactionsBy(DateTime month)
            {
                var budgets = await _context.Budgets
                        .Include(budget => budget.Category.Transactions)
                        .Include(budget => budget.Category.CategoryGroup)
                        .AsNoTracking()
                        .Where(budget => budget.MonthForBudget.Year == month.Year && budget.MonthForBudget.Month == month.Month)
                        .ToListAsync();

                budgets.ForEach(budget => budget.Category?.EnsureTransactionsAreFrom(month));

                return budgets;
            }            

            private IEnumerable<Budget> CreateTemporaryBudgetsFor(IEnumerable<Category> categoriesWithoutBudget, DateTime month)
            {
                foreach (var category in categoriesWithoutBudget)
                {
                    yield return new Budget(month, 0M, category);
                }
            }

            private Budget CreateTemporaryUncategorizedBudgetFrom(IEnumerable<Transaction> transactionsWithoutCategory, DateTime month)
            {
                var category = new Category("Uncategorized", new CategoryGroup("-"), transactionsWithoutCategory);
                return new Budget(month, 0M, category);
            }
        }
    }
}
