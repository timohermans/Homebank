using Homebank.Core.Domain.Helpers;
using System;
using System.Threading.Tasks;

namespace Homebank.Core.Domain.Entities
{
    public class Transaction : BaseEntity
    {
        public DateTime Date { get; private set; }
        public string Payee { get; private set; }
        public Category Category { get; private set; }
        public string Memo { get; private set; }
        public decimal OutFlow { get; private set; }
        public decimal Inflow { get; private set; }
        public bool IsBankTransaction { get; private set; }

        private Transaction() { }

        public Transaction(DateTime date, string payee, Category category, string memo, decimal outFlow, decimal inflow, bool isBankTransaction)
        {
            Guard.AgainstDefaultValue(date, "Must supply a valid date");

            Date = date;
            Payee = payee ?? throw new ArgumentNullException(nameof(payee));
            Category = category;
            Memo = memo ?? throw new ArgumentNullException(nameof(memo));
            OutFlow = outFlow;
            Inflow = inflow;
            IsBankTransaction = isBankTransaction;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            var transaction = obj as Transaction;

            return transaction != null
                    && transaction.Date == Date
                    && transaction.Payee == Payee
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
                hash = hash * 23 + Inflow.GetHashCode();
                hash = hash * 23 + OutFlow.GetHashCode();
                return hash;
            }
        }
    }
}