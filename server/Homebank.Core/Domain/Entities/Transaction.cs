using Homebank.Core.Domain.Helpers;
using System;

namespace Homebank.Core.Domain.Entities
{
    public class Transaction: BaseEntity
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
            Category = category ?? throw new ArgumentNullException(nameof(category));
            Memo = memo ?? throw new ArgumentNullException(nameof(memo));
            OutFlow = outFlow;
            Inflow = inflow;
            IsBankTransaction = isBankTransaction;
        }
    }
}