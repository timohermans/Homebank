using MediatR;
namespace Homebank.Core.Dto.Transactions
{
    public class UpdateTransactionRequest : IRequest<TransactionResponse>
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
    }
}