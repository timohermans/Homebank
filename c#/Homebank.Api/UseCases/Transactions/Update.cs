using System.Threading;
using System.Threading.Tasks;
using Homebank.Api.Domain.Entities;
using Homebank.Api.Domain.Helpers;
using Homebank.Api.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Homebank.Api.UseCases.Transactions
{
    public class Update
    {
        public class Command : IRequest<GetAll.Response>
        {
            public int Id { get; set; }
            public int CategoryId { get; set; }
            public bool IsInflowForBudgeting { get; set; }
        }

        public class UseCase : IRequestHandler<Command, GetAll.Response>
        {
            private readonly AppDbContext _context;

            public UseCase(AppDbContext context)
            {
                _context = context;
            }

            public async Task<GetAll.Response> Handle(Command request, CancellationToken cancellationToken)
            {
                var transaction = await _context.Transactions.FindAsync(request.Id);
                Guard.AgainstNull(transaction, nameof(Transaction));

                var category = await _context.Categories
                    .FirstOrDefaultAsync(transactionInDb => transactionInDb.Id == request.CategoryId, cancellationToken: cancellationToken);

                Guard.AgainstNull(category, nameof(request.CategoryId));

                transaction.AssignCategory(category);
                transaction.MarkAsTransactionForInflow(request.IsInflowForBudgeting);

                await _context.SaveChangesAsync(cancellationToken);

                return GetAll.Response.MapFrom(transaction);
            }
        }
    }
}