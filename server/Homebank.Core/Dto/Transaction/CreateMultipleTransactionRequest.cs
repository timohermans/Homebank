using MediatR;
using System.Collections.Generic;

namespace Homebank.Core.Dto.Transaction
{
    public class CreateMultipleTransactionRequest: IRequest<bool>
    {
        public IList<NewTransactionRequest> Transactions { get; set; }
    }
}
