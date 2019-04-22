using Homebank.Core.Domain.Entities;
using Homebank.Core.Domain.Helpers;
using Homebank.Core.Dto.Budgets;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.Budgets
{
    public class AssignBudgetUseCaseUseCase : IRequestHandler<AssignBudgetRequest, BudgetResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public AssignBudgetUseCaseUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BudgetResponse> Handle(AssignBudgetRequest request, CancellationToken cancellationToken)
        {
            var budget = await _unitOfWork.Budgets.GetByAsync(request.CategoryId, request.Month);

            if (budget == null)
            {
                budget = await CreateBudgetBy(request);   
            }

            budget.Assign(request.Budgeted);

            await _unitOfWork.Complete();
            
            return BudgetResponse.MapFrom(budget);
        }

        private async Task<Budget> CreateBudgetBy(AssignBudgetRequest request)
        {
            var category = await _unitOfWork.Categories.GetWithoutBudgetByAsync(request.CategoryId, request.Month);
            var budget = new Budget(request.Month, request.Budgeted, category);

            await _unitOfWork.Budgets.Create(budget);

            return budget;
        }
    }
}