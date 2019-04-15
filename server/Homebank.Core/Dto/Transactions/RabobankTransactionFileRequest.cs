using MediatR;
namespace Homebank.Core.Dto.Transactions
{
    public class RabobankTransactionFileRequest : IRequest<TransactionExtractionResponse>
    {
        public byte[] TransactionFile { get; set; }
    }
}