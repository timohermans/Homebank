using MediatR;

namespace Homebank.Core.Dto.Budgets
{
    public class TotalBudgetBalanceRequest : BaseMonthRequest, IRequest<TotalBudgetBalanceResponse>
    {
    }
}