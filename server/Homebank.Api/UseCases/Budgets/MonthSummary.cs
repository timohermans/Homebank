using Homebank.Api.Infrastructure;
using Homebank.Api.Infrastructure.Extensions;
using Homebank.Api.UseCases;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.Budgets
{
    public static class MonthSummary
    {
        public class Query : BaseMonthRequest, IRequest<Response>
        {
        }

        public class Response
        {
            public decimal FundsAvailable { get; set; }
            public decimal OverspentLastMonth { get; set; }
            public decimal BudgetedThisMonth { get; set; }
            public decimal BudgetedInTheFuture { get; set; }
            public decimal Balance => FundsAvailable - OverspentLastMonth - BudgetedThisMonth - BudgetedInTheFuture;

            public Response(decimal fundsAvailable, decimal overspentLastMonth, decimal budgetedThisMonth, decimal budgetedInTheFuture)
            {
                FundsAvailable = fundsAvailable;
                OverspentLastMonth = overspentLastMonth;
                BudgetedThisMonth = budgetedThisMonth;
                BudgetedInTheFuture = budgetedInTheFuture;
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
                var allInflow = await GetAllInflowForBudgetingFor(request.Month);
                var allBudgeted = await GetAllBudgetedUntil(request.Month);

                var fundsAvailable = allInflow - allBudgeted;

                var overspentLastMonth = GetOverspentBy(request.Month.AddMonths(-1));
                var budgetedThisMonth = await GetBudgetedForAsync(request.Month);
                var budgetedInFuture = await GetBudgetedStartingFromAsync(request.Month.AddMonths(1));

                return new Response(fundsAvailable, overspentLastMonth, budgetedThisMonth, budgetedInFuture);
            }

            public async Task<decimal> GetAllInflowForBudgetingFor(DateTime month)
            {
                return await _context.Transactions
                    .Where(transaction => transaction.Date <= month.ToEndOfMonthDate() && transaction.IsInflowForBudgeting)
                    .SumAsync(transaction => transaction.Inflow);
            }

            public async Task<decimal> GetAllBudgetedUntil(DateTime month)
            {
                return await _context.Budgets
                    .Where(budget => budget.MonthForBudget <= month.ToEndOfMonthDate())
                    .SumAsync(budget => budget.Budgeted);
            }

            public decimal GetOverspentBy(DateTime dateTime)
            {
                return _context.Budgets
                        .Include(budget => budget.Category)
                        .ThenInclude(category => category.Transactions)
                        .Where(budget => budget.MonthForBudget.IsSameMonthAndYear(dateTime))
                        // computed properties aren't evaluated before ToList
                        // yes this sucks, no there's no good alternative
                        // perhaps this: https://daveaglick.com/posts/computed-properties-and-entity-framework-revisited
                        .ToList()
                        .Where(budget => budget.Available < 0)
                        .Sum(budget => budget.Available.GetValueOrDefault());
            }

            public async Task<decimal> GetBudgetedForAsync(DateTime month)
            {
                return await _context.Budgets
                        .Where(budget => budget.MonthForBudget.IsSameMonthAndYear(month))
                        .SumAsync(budget => budget.Budgeted);
            }

            public async Task<decimal> GetBudgetedStartingFromAsync(DateTime month)
            {
                return await _context.Budgets
                        .Where(budget => budget.MonthForBudget >= month.ToMonthDate())
                        .SumAsync(budget => budget.Budgeted);
            }
        }
    }
}