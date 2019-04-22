using MediatR;
using System;

namespace Homebank.Core.Dto.Budgets
{
    public class BudgetOfMonthRequest : IRequest<BudgetsResponse>
    {
        public DateTime Month { get; set; }
    }
}