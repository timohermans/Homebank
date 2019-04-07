using Homebank.Core.Domain.Entities;
using Homebank.Core.Dto.Transaction;
using Homebank.Core.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases
{
    public class CreateMultipleTransactionsUseCase : IRequestHandler<CreateMultipleTransactionRequest, bool>
    {
        private readonly IRepository<Transaction> _transactionRepository;

        public CreateMultipleTransactionsUseCase(IRepository<Transaction> transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        public async Task<bool> Handle(CreateMultipleTransactionRequest request, CancellationToken cancellationToken)
        {
            var transactions = new List<Transaction>();

            foreach (var transactionRequest in request.Transactions)
            {
                var transaction = new Transaction(
                    transactionRequest.Amount,
                    transactionRequest.ReceiverAccountNumber,
                    transactionRequest.ContraAccountName,
                    transactionRequest.ContraAccountNumber,
                    transactionRequest.Description,
                    transactionRequest.Date,
                    transactionRequest.BalanceAfterTransaction
                    );

                transactions.Add(transaction);
            }

            await _transactionRepository.CreateMultiple(transactions);
            await _transactionRepository.SaveChanges();

            return true;
        }
    }
}
