using FakeItEasy;
using Homebank.Core.Domain.Entities;
using Homebank.Core.Dto.Transactions;
using Homebank.Core.UseCases.Transactions;
using Homebank.Infrastructure.Converters;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Homebank.Core.Test.UseCases.Transactions
{
    public class ExtractRabobankTransactionsFromFileUseCaseTests
    {
        private ExtractRabobankTransactionsFromFileUseCase _usecase;
        private RabobankTransactionFileRequest _request;
        private IUnitOfWork _unitOfWork;
        private byte[] transactionFileBytes;

        private async Task ArrangeWith(string file, IList<Transaction> databaseTransactions = null)
        {
            transactionFileBytes = await System.IO.File.ReadAllBytesAsync(file);
            _unitOfWork = A.Fake<IUnitOfWork>();
            _request = new RabobankTransactionFileRequest { TransactionFile = transactionFileBytes };
            _usecase = new ExtractRabobankTransactionsFromFileUseCase(_unitOfWork, new RabobankCsvConverter());

            if (databaseTransactions != null)
            {
                A.CallTo(() => _unitOfWork.Transactions.GetAll()).Returns(databaseTransactions);
            }
        }

        [Fact]
        public async Task Handle_ValidCompletelyNewTransactionFile_ConvertsSuccessfully()
        {
            await ArrangeWith("Data/CSV_A_20190406_172126.csv");

            var result = await _usecase.Handle(_request, CancellationToken.None);

            Assert.Equal(22, result.NewTransactions);
            Assert.Equal(0, result.DuplicateTransactions);
        }

        [Fact]
        public async Task Handle_ValidCompletelyNewSingleTransactionFile_InsertsSucessfully()
        {
            await ArrangeWith("Data/CSV_A_20190406_172126_single.csv");

            var result = await _usecase.Handle(_request, CancellationToken.None);

            Func<IList<Transaction>, bool> assertionCheck = transactions =>
            {
                var transaction = transactions.FirstOrDefault();
                return transaction.Payee == "J.M.G. Kerkhoffs eo"
                && transaction.Date == new DateTime(2019, 04, 01)
                && transaction.Inflow == 2.5M
                && transaction.Memo == "Spotify";
            };
            A.CallTo(
                () => _unitOfWork.Transactions.CreateMultiple(A<IList<Transaction>>.That.Matches(assertionCheck, "first transaction check"))
                    ).MustHaveHappenedOnceExactly();
            A.CallTo(() => _unitOfWork.Complete()).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task Handle_ValidPartiallyDuplicateTransactionFile_InsertsPartially()
        {
            var databaseTransactions = new List<Transaction> { new Transaction(new DateTime(2019, 04, 01), "J.M.G. Kerkhoffs eo", null, "Spotify", 0, 2.5M, true) };
            await ArrangeWith("Data/CSV_A_20190406_172126_double.csv", databaseTransactions);

            var result = await _usecase.Handle(_request, CancellationToken.None);


            Assert.Equal(1, result.NewTransactions);
            Assert.Equal(1, result.DuplicateTransactions);
            Func<IList<Transaction>, bool> assertionCheck = transactions =>
            {
                var transaction = transactions.FirstOrDefault();
                return transaction.Payee == "OHRA Zorgverzekeringen" && transactions.Count == 1;
            };
            A.CallTo(
                () => _unitOfWork.Transactions.CreateMultiple(
                        A<IList<Transaction>>.That.Matches(assertionCheck, "only one transaction should be inserted"))
                    ).MustHaveHappenedOnceExactly();
        }
    }
}
