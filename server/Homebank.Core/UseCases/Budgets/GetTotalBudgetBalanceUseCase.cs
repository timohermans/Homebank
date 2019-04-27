using Homebank.Core.Dto.Budgets;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.Budgets
{
    public class GetTotalBudgetBalanceUseCaseUseCase : IRequestHandler<TotalBudgetBalanceRequest, TotalBudgetBalanceResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetTotalBudgetBalanceUseCaseUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<TotalBudgetBalanceResponse> Handle(TotalBudgetBalanceRequest request, CancellationToken cancellationToken)
        {
            var allInflow = await _unitOfWork.Transactions.GetAllInflowForBudgetingFor(request.Month);
            var allBudgeted = await _unitOfWork.Budgets.GetAllBudgetedUntil(request.Month);

            var fundsAvailable = allInflow - allBudgeted;

            var overspentLastMonth = _unitOfWork.Budgets.GetOverspentBy(request.Month.AddMonths(-1));
            var budgetedThisMonth = await _unitOfWork.Budgets.GetBudgetedForAsync(request.Month);
            var budgetedInFuture = await _unitOfWork.Budgets.GetBudgetedStartingFromAsync(request.Month.AddMonths(1));

            return new TotalBudgetBalanceResponse(fundsAvailable, overspentLastMonth, budgetedThisMonth, budgetedInFuture);
        }
    }
}