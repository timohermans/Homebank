using System;

namespace Homebank.Core.Dto.Transaction
{
    public class NewTransactionRequest
    {
        public decimal Amount { get; set; }
        public string ReceiverAccountNumber { get; set; }
        public string ContraAccountNumber { get; set; }
        public string ContraAccountName { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public decimal BalanceAfterTransaction { get; set; }
        public bool IsNecessaryCost { get; set; }
    }
}
