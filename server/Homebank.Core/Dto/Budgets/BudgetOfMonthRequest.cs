using MediatR;
using System;

namespace Homebank.Core.Dto.Budgets
{
    public class BudgetOfMonthRequest : BaseMonthRequest, IRequest<BudgetsResponse>
    {
    }
}