using MediatR;
using System;
using System.ComponentModel.DataAnnotations;

namespace Homebank.Core.Dto.Budgets
{
    public class AssignBudgetRequest : BaseMonthRequest, IRequest<BudgetResponse>
    {
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public decimal Budgeted { get; set; }
    }
}