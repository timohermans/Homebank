using Homebank.Core.Domain.Entities;
using System;

namespace Homebank.Core.Dto.Budgets
{
    public class BudgetResponse
    {
        public int Id { get; set; }
        public DateTime MonthForBudget { get; set; }
        public decimal Budgeted { get; set; }
        public int CategoryId { get; set; }
        public int CategoryGroupId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryGroupName { get; set; }
        public decimal Activity { get; set; }
        public decimal Available { get; set; }

        public static BudgetResponse MapFrom(Budget budget)
        {
            return new BudgetResponse
            {
                Id = budget.Id,
                Activity = budget.Activity.GetValueOrDefault(),
                Available = budget.Available.GetValueOrDefault(),
                Budgeted = budget.Budgeted,
                CategoryGroupId = budget.Category.CategoryGroup.Id,
                CategoryGroupName = budget.Category.CategoryGroup.Name,
                CategoryId = budget.Category.Id,
                CategoryName = budget.Category.Name,
                MonthForBudget = budget.MonthForBudget
            };
        }
    }
}