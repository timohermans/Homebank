using Homebank.Core.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Homebank.Core.Dto.Budgets
{
    public class BudgetsResponse
    {
        public IList<BudgetResponse> Budgets { get; set; }

        public BudgetsResponse(IEnumerable<Budget> budgets)
        {
            if (budgets != null)
            {
                Budgets = MapBudgets(budgets).ToList();
            }
        }

        private IEnumerable<BudgetResponse> MapBudgets(IEnumerable<Budget> budgets)
        {
            foreach (var budget in budgets)
            {
                yield return BudgetResponse.MapFrom(budget);
            }
        }
    }
}