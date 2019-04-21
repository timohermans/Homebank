using Homebank.Core.Domain.Entities;
using Homebank.Core.Domain.Helpers;
using Homebank.Core.Dto.Transactions;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.Transactions
{
    public class UpdateTransactionUseCase : IRequestHandler<UpdateTransactionRequest, TransactionResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public UpdateTransactionUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<TransactionResponse> Handle(UpdateTransactionRequest request, CancellationToken cancellationToken)
        {
            var transaction = await _unitOfWork.Transactions.GetBy(request.Id);
            Guard.AgainstNull(transaction, nameof(Transaction));

            var category = await _unitOfWork.Categories.GetWithGroupByAsync(request.CategoryId);
            Guard.AgainstNull(category, nameof(request.CategoryId));

            transaction.AssignCategory(category);
            await _unitOfWork.Complete();

            return TransactionResponse.MapFrom(transaction);
        }
    }
}