using MediatR;
using System;
using System.ComponentModel.DataAnnotations;

namespace Homebank.Core.Dto.Budgets
{
    public class AssignBudgetRequest : IRequest<BudgetResponse>
    {
        [Required]
        public DateTime Month { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public decimal Budgeted { get; set; }
    }
}