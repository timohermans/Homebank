using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Homebank.Api.Domain.Entities;
using Homebank.Api.Domain.Helpers;
using Homebank.Api.Infrastructure;
using MediatR;

namespace Homebank.Api.UseCases.Transactions
{

    public static class Create
    {
        public class Command : IRequest<Get.Response>
        {
            [Required]
            public DateTime Date { get; set; }
            [Required]
            public string Payee { get; set; }
            [Required]
            public string Memo { get; set; }
            public decimal OutFlow { get; set; }
            public bool IsBankTransaction { get; set; }
            public decimal Inflow { get; set; }
            public Categories.Create.Command Category { get; set; }
        }

        public class UseCase : IRequestHandler<Command, Get.Response>
        {
            private readonly AppDbContext _context;

            public UseCase(AppDbContext context)
            {
                _context = context;
            }

            public async Task<Get.Response> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.AgainstNull(request, nameof(request));

                Category category = null;
                if (request.Category != null)
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

                await _context.Transactions.AddAsync(transaction, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return Get.Response.MapFrom(transaction);
            }
        }

    }

}
