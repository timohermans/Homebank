using Homebank.Api.Domain.Entities;
using Homebank.Api.Infrastructure;
using Homebank.Api.Infrastructure.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Api.UseCases.Budgets
{
    public static class Create
    {
        public class Command : BaseMonthRequest, IRequest<Response>
        {
            [Required]
            public int CategoryId { get; set; }
            [Required]
            public decimal Budgeted { get; set; }
        }

        public class Response
        {
            public int Id { get; set; }      
        }

        public class UseCase : IRequestHandler<Command, Response>
        {
            private readonly AppDbContext _context;

            public UseCase(AppDbContext context)
            {
                _context = context;
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                var budget = await GetBudgetFor(request) ?? await CreateBudgetBy(request);

                budget.Assign(request.Budgeted);

                await _context.SaveChangesAsync(cancellationToken);

                return new Response { Id = budget.Id };
            }

            private async Task<Budget> GetBudgetFor(Command request)
            {
                var budget = await _context.Budgets
                                .Include(budgetInDb => budgetInDb.Category.Transactions)
                                .Include(budgetInDb => budgetInDb.Category.CategoryGroup)
                                .FirstOrDefaultAsync(budgetInDb => budgetInDb.MonthForBudget.IsSameMonthAndYear(request.Month)
                                            && budgetInDb.Category.Id == request.CategoryId);

                budget?.Category.EnsureTransactionsAreFrom(request.Month);
                return budget;
            }

            private async Task<Budget> CreateBudgetBy(Command request)
            {
                var category = await GetWithoutBudgetByAsync(request.CategoryId, request.Month);
                var budget = new Budget(request.Month, request.Budgeted, category);

                await _context.Budgets.AddAsync(budget);

                return budget;
            }

            private async Task<Category> GetWithoutBudgetByAsync(int categoryId, DateTime month)
            {
                var categoryFound = await _context.Categories
                  .Include(category => category.Transactions)
                  .Include(category => category.CategoryGroup)
                  .Where(category => category.Budgets == null
                                      || !category.Budgets.Any(budget => budget.MonthForBudget.IsSameMonthAndYear(month)))
                  .FirstOrDefaultAsync(category => category.Id == categoryId);

                categoryFound?.EnsureTransactionsAreFrom(month);

                return categoryFound;
            }
        }
    }   
}