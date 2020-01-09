using System;
using Homebank.Api.Domain.Entities;

namespace Homebank.Api.UseCases.Transactions
{
  public class Get
  {
    public class Response
    {
      public int Id { get; private set; }
      public DateTime Date { get; private set; }
      public string Payee { get; private set; }
      public string Memo { get; private set; }
      public decimal Outflow { get; private set; }
      public decimal Inflow { get; private set; }
      public bool IsBankTransaction { get; private set; }

      public CategoryResponse Category { get; private set; }

      public class CategoryResponse
      {
        public int Id { get; set; }
        public string Name { get; set; }
        public string IconName { get; set; }
      }


      public static Response MapFrom(Transaction transaction)
      {
        var result = new Response
        {
          Id = transaction.Id,
          Date = transaction.Date,
          Inflow = transaction.Inflow,
          Outflow = transaction.OutFlow,
          IsBankTransaction = transaction.IsBankTransaction,
          Memo = transaction.Memo,
          Payee = transaction.Payee
        };

        if (transaction.Category != null) {
          result.Category = new CategoryResponse
          {
            Id = transaction.Category.Id,
            Name = transaction.Category.Name,
            IconName = transaction.Category.IconName
          };
        }

        return result;
      }
    }

  }
}