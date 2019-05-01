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
    public static class Update
    {
        public class Command : IRequest<Response>
        {
            [Required] public int Id { get; set; }

            [Required] [MaxLength(50)] public string Name { get; set; }
        }

        public class Response
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }

        public class UseCase : IRequestHandler<Command, Response>
        {
            private readonly AppDbContext _context;

            public UseCase(AppDbContext context)
            {
                _context = context;
            }

            public async Task<Response> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var group = await _context.CategoryGroups.FirstOrDefaultAsync(
                    groupInDb => groupInDb.Name.Equals(request.Name, StringComparison.OrdinalIgnoreCase),
                    cancellationToken: cancellationToken);

                Guard.AgainstNull(group, nameof(CategoryGroup));

                group.ChangeNameWith(request.Name);

                await _context.SaveChangesAsync(cancellationToken);

                return new Response
                {
                    Id = group.Id,
                    Name = group.Name
                };
            }
        }
    }
}