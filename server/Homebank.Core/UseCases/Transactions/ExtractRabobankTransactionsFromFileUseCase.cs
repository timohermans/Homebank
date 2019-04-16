using Homebank.Core.Converters;
using Homebank.Core.Dto.Transactions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.Transactions
{
    public class ExtractRabobankTransactionsFromFileUseCase : IRequestHandler<RabobankTransactionFileRequest, TransactionExtractionResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRabobankCsvConverter _csvConverter;

        public ExtractRabobankTransactionsFromFileUseCase(IUnitOfWork unitOfWork, IRabobankCsvConverter csvConverter)
        {
            _unitOfWork = unitOfWork;
            _csvConverter = csvConverter;
        }

        public async Task<TransactionExtractionResponse> Handle(RabobankTransactionFileRequest request, CancellationToken cancellationToken)
        {
            var transactions = _csvConverter.Convert(request.TransactionFile).ToList();

            await _unitOfWork.Transactions.CreateMultiple(transactions);

            return new TransactionExtractionResponse
            {
                NewTransactions = transactions.Count()
            };
        }
    }
}
