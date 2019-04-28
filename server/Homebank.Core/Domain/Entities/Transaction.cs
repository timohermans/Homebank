using Homebank.Core.Domain.Helpers;
using System;

namespace Homebank.Core.Domain.Entities
{
    public class Transaction : BaseEntity
    {
        private Category _category;

        public DateTime Date { get; private set; }
        public string Payee { get; private set; }
        public string Memo { get; private set; }
        public decimal OutFlow { get; private set; }
        public decimal Inflow { get; private set; }
        public bool IsBankTransaction { get; private set; }
        public bool IsInflowForBudgeting { get; private set; }
        public Category Category {
            get {
                if (IsInflowForBudgeting)
                {
                    return new Category("To be budgeted", new CategoryGroup("Inflow"));
                }

                return _category;
            }
            private set {
                _category = value;
            }
        }

        private Transaction()
        {
        }

        public Transaction(DateTime date, string payee, Category category, string memo, decimal outFlow, decimal inflow, bool isBankTransaction)
        {
            Guard.AgainstDefaultValue(date, "Must supply a valid date");

            if (inflow == default(decimal) && outFlow == default(decimal))
            {
                throw new ArgumentException("Must have at least an inflow or an outflow");
            }

            Date = date;
            Payee = payee ?? throw new ArgumentNullException(nameof(payee));
            Memo = memo ?? throw new ArgumentNullException(nameof(memo));
            OutFlow = outFlow;
            Inflow = inflow;
            IsBankTransaction = isBankTransaction;

            if (category?.Name.ToLower() == "inflow")
            {
                MarkAsTransactionForInflow(true);
            }
            else if (category != null)
            {
                AssignCategory(category);
            }
        }

        public void AssignCategory(Category category)
        {
            Guard.AgainstNull(category, nameof(category));

            IsInflowForBudgeting = false;
            Category = category;
        }

        public void MarkAsTransactionForInflow(bool isInflowForBudgeting)
        {
            if (isInflowForBudgeting)
            {
                Category = null;
            }

            IsInflowForBudgeting = isInflowForBudgeting;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            var transaction = obj as Transaction;

            return transaction != null
                    && transaction.Date == Date
                    && transaction.Payee == Payee
                    && transaction.Memo == Memo
                    && transaction.Inflow == Inflow
                    && transaction.OutFlow == OutFlow;
        }

        public override int GetHashCode()
        {
            unchecked
            {
                var hash = 17;
                hash = hash * 23 + Date.GetHashCode();
                hash = hash * 23 + Payee.GetHashCode();
                hash = hash * 23 + Memo.GetHashCode();
                hash = hash * 23 + Inflow.GetHashCode();
                hash = hash * 23 + OutFlow.GetHashCode();
                return hash;
            }
        }
    }
}