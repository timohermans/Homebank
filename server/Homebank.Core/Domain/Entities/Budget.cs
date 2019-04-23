using Homebank.Core.Domain.Helpers;
using System;
using System.Linq;

namespace Homebank.Core.Domain.Entities
{
    public class Budget : BaseEntity
    {
        public DateTime MonthForBudget { get; private set; }
        public decimal Budgeted { get; private set; }
        public Category Category { get; private set; }

        public decimal? Activity {
            get {
                return Category?.Transactions
                    .Where(transaction => transaction.Date.Year == MonthForBudget.Year &&
                        transaction.Date.Month == MonthForBudget.Month)
                    .Sum(transaction => transaction.Inflow != default(decimal) ? transaction.Inflow : transaction.OutFlow * -1);
            }
        }
        public decimal? Available => Budgeted + Activity;

        private Budget() { }

        public Budget(DateTime monthForBudget, decimal budgeted, Category category)
        {
            MonthForBudget = monthForBudget;
            Budgeted = budgeted;
            Category = category ?? throw new ArgumentNullException(nameof(category));
        }

        public void Assign(decimal budgeted)
        {
            Guard.AgainstNull(budgeted, nameof(budgeted));
            Budgeted = budgeted;
        }
    }
}
