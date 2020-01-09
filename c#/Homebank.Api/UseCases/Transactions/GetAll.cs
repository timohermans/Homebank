using System;
using Homebank.Api.Domain.Entities;

namespace Homebank.Api.UseCases.Transactions
{
    public class GetAll
    {
        public class Response
        {
            // IMPROVEMENT: make identifiers string
            public int Id { get; private set; }
            public DateTime Date { get; private set; }
            public string Payee { get; private set; }
            public string Category { get; private set; }
            public string Memo { get; private set; }
            public decimal Outflow { get; private set; }
            public decimal Inflow { get; private set; }
            public bool IsBankTransaction { get; private set; }

            public static Response MapFrom(Transaction transaction)
            {
                return new Response
                {
                    Id = transaction.Id,
                    Category = transaction.Category != null ? transaction?.Category.Name : "Uncategorized",
                    Date = transaction.Date,
                    Inflow = transaction.Inflow,
                    Outflow = transaction.OutFlow,
                    IsBankTransaction = transaction.IsBankTransaction,
                    Memo = transaction.Memo,
                    Payee = transaction.Payee
                };
            }
        }
    }
}
