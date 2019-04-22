using FakeItEasy;
using Homebank.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Homebank.Core.Test.UseCases.Transactions
{
    public class UpdateTransactionUseCaseTests
    {
        private IUnitOfWork _unitOfWork;

        private void ArrangeWith(Transaction transactionInDatabase = null)
        {
            _unitOfWork = A.Fake<IUnitOfWork>();

            if (transactionInDatabase != null)
            {
                A.CallTo(() => _unitOfWork.Transactions.GetBy(transactionInDatabase.Id)).Returns(transactionInDatabase);
            }
        }

        [Fact]
        public async Task Handle_ValidCategoryUpdateRequest_UpdatesRecord()
        {
            var transactionInDatabase = new Transaction(new DateTime(2019, 04, 01), "payee", null, "memo", 0.0M, 10.2M, true);
            ArrangeWith(transactionInDatabase);
        }
    }
}
