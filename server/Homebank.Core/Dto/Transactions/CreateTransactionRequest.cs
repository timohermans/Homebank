using Homebank.Core.Dto.Categories;
using MediatR;
using System;
using System.ComponentModel.DataAnnotations;

namespace Homebank.Core.Dto.Transactions
{
    public class CreateTransactionRequest : IRequest<TransactionResponse>
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Payee { get; set; }
        [Required]
        public string Memo { get; set; }
        public decimal OutFlow { get; set; }
        public bool IsBankTransaction { get; set; }
        public decimal Inflow { get; set; }
        public NewCategoryRequest Category { get; set; }
    }
}