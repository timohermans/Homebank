using Homebank.Core.Dto.Transactions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.Transactions
{
    public class ExtractRabobankTransactionsFromFileUseCase : IRequestHandler<RabobankTransactionFileRequest, TransactionExtractionResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public ExtractRabobankTransactionsFromFileUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<TransactionExtractionResponse> Handle(RabobankTransactionFileRequest request, CancellationToken cancellationToken)
        {
            return new TransactionExtractionResponse();
        }
    }
}
