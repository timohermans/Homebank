using System;

namespace Homebank.Core.Domain.Entities
{
    public class Transaction
    {
        public int Id { get; private set; }
        public decimal Amount { get; private set; }
        public string ReceiverAccountNumber { get; private set; }
        public string ContraAccountNumber { get; private set; }
        public string ContraAccountName { get; private set; }
        public string Description { get; private set; }
        public DateTime Date { get; private set; }
        public decimal BalanceAfterTransaction { get; private set; }
        public bool IsNecessaryCost { get; private set; }

        public Transaction(decimal amount, string receiverAccountNumber, string contraAccountNumber, string contraAccountName, string description, DateTime date, decimal balanceAfterTransaction)
        {
            Amount = amount;
            ReceiverAccountNumber = receiverAccountNumber;
            ContraAccountNumber = contraAccountNumber;
            ContraAccountName = contraAccountName;
            Description = description;
            Date = date;
            BalanceAfterTransaction = balanceAfterTransaction;
            IsNecessaryCost = false;
        }

        public void MarkTransactionAs(bool isNecessary)
        {
            IsNecessaryCost = IsNecessaryCost;
        }
    }
}
