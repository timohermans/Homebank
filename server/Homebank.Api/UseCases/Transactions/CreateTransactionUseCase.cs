using Homebank.Api.Domain.Helpers;
using Homebank.Core.Domain.Entities;
using Homebank.Core.Domain.Helpers;
using Homebank.Core.Dto.Transactions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.Transactions
{

    public class CreateTransactionUseCaseUseCase : IRequestHandler<CreateTransactionRequest, TransactionResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateTransactionUseCaseUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<TransactionResponse> Handle(CreateTransactionRequest request, CancellationToken cancellationToken)
        {
            Guard.AgainstNull(request, nameof(request));

            Category category = null;
            if(request.Category != null)
            {
                category = new Category(request.Category.CategoryName, new CategoryGroup(request.Category.CategoryGroupName));
            }

            var transaction = new Transaction(
                request.Date,
                request.Payee,
                category,
                request.Memo,
                request.OutFlow,
                request.Inflow,
                request.IsBankTransaction
                );

            await _unitOfWork.Transactions.Create(transaction);
            await _unitOfWork.Complete();

            return TransactionResponse.MapFrom(transaction);
        }
    }
}
