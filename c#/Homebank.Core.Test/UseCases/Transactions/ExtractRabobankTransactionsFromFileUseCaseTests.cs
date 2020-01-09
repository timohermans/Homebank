using FakeItEasy;
using Homebank.Api.Domain.Entities;
using Homebank.Api.Infrastructure;
using Homebank.Api.Infrastructure.Converters;
using Homebank.Api.UseCases.Transactions;
using Homebank.Core.Test;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

using static Homebank.Core.Test.SliceFixture;

namespace Homebank.Core.Test.UseCases.Transactions
{
    public class ExtractRabobankTransactionsFromFileUseCaseTests
    {
        private UploadFromFile.UseCase _usecase;
        private UploadFromFile.Command _request;
        private AppDbContext _unitOfWork;
        private byte[] transactionFileBytes;

        private async Task ArrangeWith(string file, IList<Transaction> databaseTransactions = null)
        {
            await ClearDatabaseAsync();
            transactionFileBytes = await System.IO.File.ReadAllBytesAsync(file);
            _request = new UploadFromFile.Command { TransactionFile = transactionFileBytes };
            _usecase = new UploadFromFile.UseCase(_unitOfWork, new RabobankCsvConverter());

            if (databaseTransactions != null)
            {
                await InsertAsync<Transaction>(databaseTransactions.ToArray());
            }
        }

        [Fact]
        public async Task Handle_ValidCompletelyNewTransactionFile_ConvertsSuccessfully()
        {
            await ArrangeWith("Data/CSV_A_20190406_172126.csv");

            var result = await SendAsync(_request);

            Assert.Equal(22, result.NewTransactions);
            Assert.Equal(0, result.DuplicateTransactions);
        }

        [Fact]
        public async Task Handle_ValidCompletelyNewSingleTransactionFile_InsertsSucessfully()
        {
            await ArrangeWith("Data/CSV_A_20190406_172126_single.csv");

            var result = await SendAsync(_request);

            var transactionFound = await ExecuteDbContextAsync(async (context) => await context.Transactions.FirstOrDefaultAsync(transaction => transaction.Payee == "J.M.G. Kerkhoffs eo"
                && transaction.Date == new DateTime(2019, 04, 01)
                && transaction.Inflow == 2.5M
                && transaction.Memo == "Spotify"));

            Assert.NotNull(transactionFound);
        }

        [Fact]
        public async Task Handle_ValidPartiallyDuplicateTransactionFile_InsertsPartially()
        {
            var transactionThatAlreadyExists = new Transaction(new DateTime(2019, 04, 01), "J.M.G. Kerkhoffs eo", null, "Spotify", 0, 2.5M, true);
            var databaseTransactions = new List<Transaction> { transactionThatAlreadyExists };
            await ArrangeWith("Data/CSV_A_20190406_172126_double.csv", databaseTransactions);

            var result = await SendAsync(_request);

            Assert.Equal(1, result.NewTransactions);
            Assert.Equal(1, result.DuplicateTransactions);

            var transactions = await ExecuteDbContextAsync(async (context) => await context.Transactions.ToListAsync());
            Assert.Equal("OHRA Zorgverzekeringen", transactions.FirstOrDefault(transaction => transaction.Payee != transactionThatAlreadyExists.Payee).Payee);           
        }

        [Fact]
        public async Task Handle_ValidNewTransactionWithSimilarExistingTransaction_AssignsCategoryToNew()
        {
            var categoryNameThatShouldBeAssigned = "Verzekeringen";

            var databaseTransactions = new List<Transaction> {
                new Transaction(new DateTime(2019, 04, 01), "J.M.G. Kerkhoffs eo", null, "Spotify", 0, 2.5M, true),
                new Transaction(new DateTime(2019, 04, 01), "Verzekering", new Category(categoryNameThatShouldBeAssigned, new CategoryGroup("Vaste lasten")), "Spotify", 0, 2.5M, true)
            };
            await ArrangeWith("Data/CSV_A_20190406_172126_double.csv", databaseTransactions);

            var result = await SendAsync(_request);

            var transaction = await ExecuteDbContextAsync(async context => await context
                    .Transactions
                    .Include(transInDb => transInDb.Category)
                        .ThenInclude(categoryInDb => categoryInDb.CategoryGroup)
                    .FirstOrDefaultAsync(
                        transactionInDb => transactionInDb.Payee == "OHRA Zorgverzekeringen" && transactionInDb.Category.Name == categoryNameThatShouldBeAssigned));

            Assert.NotNull(transaction);
        }
    }
}