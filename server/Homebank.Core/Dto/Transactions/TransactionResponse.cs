using Homebank.Core.Domain.Entities;
using System;

namespace Homebank.Core.Dto.Transactions
{
    public class TransactionResponse
    {
        public DateTime Date { get; private set; }
        public string Payee { get; private set; }
        public string Category { get; private set; }
        public string Memo { get; private set; }
        public decimal OutFlow { get; private set; }
        public decimal Inflow { get; private set; }
        public bool IsBankTransaction { get; private set; }

        public static TransactionResponse MapFrom(Transaction transaction)
        {
            return new TransactionResponse
            {
                Category = transaction.Category != null ? $"{transaction.Category.CategoryGroup.Name} - {transaction.Category.Name}": "",
                Date = transaction.Date,
                Inflow = transaction.Inflow,
                OutFlow = transaction.OutFlow,
                IsBankTransaction = transaction.IsBankTransaction,
                Memo = transaction.Memo,
                Payee = transaction.Payee
            };
        }
    }
}