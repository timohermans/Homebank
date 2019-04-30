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
            public string GroupName { get; private set; }

            public Response(int id, string name, string groupName)
            {
                Id = id;
                Name = name ?? throw new ArgumentNullException(nameof(name));
                GroupName = groupName ?? throw new ArgumentNullException(nameof(groupName));
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
                    .Include(categoryInDb => categoryInDb.CategoryGroup)
                    .FirstOrDefaultAsync(categoryInDb => categoryInDb.Id == request.Id);

                Guard.AgainstNull(category, nameof(Category));

                category.ChangeNameWith(request.Name);
                await ChangeGroup(category, request.CategoryGroupId);

                await _context.SaveChangesAsync();
                return new Response(category.Id, category.Name, category.CategoryGroup.Name);
            }

            private async Task ChangeGroup(Category category, int newGroupId)
            {
                if (category.CategoryGroup.Id == newGroupId)
                {
                    return;
                }

                var groupToAssignTo = await _context.CategoryGroups.FindAsync(newGroupId);
                category.AssignTo(groupToAssignTo);
            }
        }

    }

}