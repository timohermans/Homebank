using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Homebank.Api.Domain.Entities;
using Homebank.Api.Domain.Helpers;
using Homebank.Api.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Homebank.Api.UseCases.CategoryGroups
{
    public static class Create
    {
        public class Command : IRequest<Response>
        {
            [Required] [MaxLength(50)] public string Name { get; set; }
        }

        public class Response
        {
            public int Id { get; set; }
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
                var categoryGroup = await _context.CategoryGroups.FirstOrDefaultAsync(
                    groupInDb => groupInDb.Name.Equals(request.Name, StringComparison.OrdinalIgnoreCase),
                    cancellationToken: cancellationToken);

                Guard.AgainstNotNull(categoryGroup, nameof(categoryGroup));

                categoryGroup = new CategoryGroup(request.Name);
                await _context.CategoryGroups.AddAsync(categoryGroup, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return new Response
                {
                    Id = categoryGroup.Id
                };
            }
        }
    }
}