using Homebank.Api.Domain.Entities;
using System;
using System.Threading.Tasks;
using Xunit;

using static Homebank.Core.Test.SliceFixture;

namespace Homebank.Core.Test.UseCases.Transactions
{
    public class UpdateTransactionUseCaseTests
    {
        private async Task ArrangeWith(Transaction transactionInDatabase = null)
        {
            await ExecuteDbContextAsync(context => context.Database.EnsureDeletedAsync());

            if (transactionInDatabase != null)
            {
                await InsertAsync(transactionInDatabase);
            }
        }

        [Fact]
        public async Task Handle_ValidCategoryUpdateRequest_UpdatesRecord()
        {
            var transactionInDatabase = new Transaction(new DateTime(2019, 04, 01), "payee", null, "memo", 0.0M, 10.2M, true);
            await ArrangeWith(transactionInDatabase);
        }
    }
}