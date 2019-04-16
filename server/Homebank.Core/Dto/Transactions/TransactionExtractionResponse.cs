using System.Collections.Generic;

namespace Homebank.Core.Dto.Transactions
{
    public class TransactionExtractionResponse
    {
        public int NewTransactions { get; set; }
        public int DuplicateTransactions { get; set; }
    }
}