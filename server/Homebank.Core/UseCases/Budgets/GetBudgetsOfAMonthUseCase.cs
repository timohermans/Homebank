using Homebank.Core.Domain.Entities;
using Homebank.Core.Dto.Budgets;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.Budgets
{

    public class GetBudgetsOfAMonthUseCaseUseCase : IRequestHandler<BudgetOfMonthRequest, BudgetsResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetBudgetsOfAMonthUseCaseUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BudgetsResponse> Handle(BudgetOfMonthRequest request, CancellationToken cancellationToken)
        {
            var transactionsWithoutCategory = await _unitOfWork.Transactions.GetUncategorizedBy(request.Month);
            var categoriesWithoutBudget = await _unitOfWork.Categories.GetWithoutBudgetsByAsync(request.Month);
            var budgets = await _unitOfWork.Budgets.GetWithTransactionsBy(request.Month);

            var budgetsForCategoriesWithoutBudget = CreateTemporaryBudgetsFor(categoriesWithoutBudget, request.Month).ToList();
            var budgetForUncategorized = CreateTemporaryUncategorizedBudgetFrom(transactionsWithoutCategory, request.Month);

            budgets.Add(budgetForUncategorized);
            budgetsForCategoriesWithoutBudget.ForEach(budget => budgets.Add(budget));

            return new BudgetsResponse(budgets);
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
