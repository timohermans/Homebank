using Homebank.Api.Domain.Entities;
using Homebank.Api.Domain.Helpers;
using Homebank.Api.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Api.UseCases.Categories
{
    public static class Update
    {
        public class Command : IRequest<Response>
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public int CategoryGroupId { get; set; }
        }

        public class Response
        {
            public int Id { get; private set; }
            public string Name { get; private set; }

            public Response(int id, string name)
            {
                Id = id;
                Name = name ?? throw new ArgumentNullException(nameof(name));
            }
        }

        public class UseCase : IRequestHandler<Command, Response>
        {
            private readonly AppDbContext _context;

            public UseCase(AppDbContext context)
            {
                _context = context;
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                var category = await _context.Categories
                    .FirstOrDefaultAsync(categoryInDb => categoryInDb.Id == request.Id,
                        cancellationToken: cancellationToken);

                Guard.AgainstNull(category, nameof(Category));

                category.ChangeNameWith(request.Name);

                await _context.SaveChangesAsync(cancellationToken);
                return new Response(category.Id, category.Name);
            }
        }
    }
}