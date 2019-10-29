using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Homebank.Api.Domain.Entities;
using Homebank.Api.Infrastructure;
using Homebank.Api.Infrastructure.Converters;
using Homebank.Api.Infrastructure.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Homebank.Api.UseCases.Transactions
{
    public static class UploadFromFile
    {
        public class Command : IRequest<Response>
        {
            public byte[] TransactionFile { get; set; }
        }

        public class Response
        {
            public int NewTransactions { get; set; }
            public int DuplicateTransactions { get; set; }
        }

        public class UseCase : IRequestHandler<Command, Response>
        {
            private readonly AppDbContext _context;
            private readonly IRabobankCsvConverter _csvConverter;

            public UseCase(AppDbContext context, IRabobankCsvConverter csvConverter)
            {
                _context = context;
                _csvConverter = csvConverter;
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                var transactionsFromFile = _csvConverter.Convert(request.TransactionFile).ToList();
                var transactionsFromDatabase = await _context.Transactions
                    .Include(transaction => transaction.Category)
                    .ToListAsync(cancellationToken: cancellationToken);
                var transactionsToCreate = new List<Transaction>();
                var transactionsThatAlreadyExist = new List<Transaction>();

                SplitTransactionsInto(transactionsToCreate, transactionsThatAlreadyExist, transactionsFromFile, transactionsFromDatabase);

                TryAssignCategoryTo(transactionsToCreate, transactionsFromDatabase);

                await _context.Transactions.AddRangeAsync(transactionsToCreate, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return new Response
                {
                    NewTransactions = transactionsToCreate.Count,
                    DuplicateTransactions = transactionsThatAlreadyExist.Count
                };
            }

            private static void SplitTransactionsInto(List<Transaction> transactionsToCreate, List<Transaction> transactionsThatAlreadyExist, List<Transaction> transactionsFromFile, IEnumerable<Transaction> transactionsFromDatabase)
            {
                foreach (var transactionFromFile in transactionsFromFile)
                {
                    if (transactionsFromDatabase.Any(transactionFromDatabase => transactionFromDatabase.Equals(transactionFromFile))
                            || transactionsToCreate.Any(transactionToCreate => transactionToCreate.Equals(transactionFromFile)))
                    {
                        transactionsThatAlreadyExist.Add(transactionFromFile);
                    }
                    else
                    {
                        transactionsToCreate.Add(transactionFromFile);
                    }
                }
            }

            private void TryAssignCategoryTo(List<Transaction> transactionsToCreate, IEnumerable<Transaction> transactionsFromDatabase)
            {
                foreach (var transaction in transactionsToCreate)
                {
                    var similarityThreshold = transaction.Payee.Length * 0.6;
                    var transactionThatIsSimilar = transactionsFromDatabase.FirstOrDefault(transactionFromDb => transaction.Payee.GetSimilarityOf(transactionFromDb.Payee) < similarityThreshold);

                    if (transactionThatIsSimilar != null && transactionThatIsSimilar.Category != null)
                    {
                        transaction.AssignCategory(transactionThatIsSimilar.Category);
                    }
                }
            }
        }
    }
}