using Homebank.Api.Domain.Entities;
using Homebank.Api.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Api.UseCases.Categories
{
    public static class Create
    {
        public class Command : IRequest<int>
        {
            [Required] public string CategoryName { get; set; }

            [Required] public string CategoryGroupName { get; set; }
        }

        public class UseCase : IRequestHandler<Command, int>
        {
            private readonly AppDbContext _context;

            public UseCase(AppDbContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                var category = await _context.Categories.FirstOrDefaultAsync(
                    categoryInDb => categoryInDb.Name.Equals(request.CategoryName, StringComparison.OrdinalIgnoreCase),
                    cancellationToken: cancellationToken);

                if (category != null)
                {
                    throw new ArgumentException("Category already exists", nameof(request.CategoryName));
                }

                var categoryGroup = await _context.CategoryGroups.FirstOrDefaultAsync(
                    groupInDb => groupInDb.Name.Equals(request.CategoryGroupName, StringComparison.OrdinalIgnoreCase),
                    cancellationToken: cancellationToken);

                if (categoryGroup == null)
                {
                    categoryGroup = new CategoryGroup(request.CategoryGroupName);
                }

                category = new Category(request.CategoryName, categoryGroup);

                await _context.Categories.AddAsync(category, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return category.Id;
            }
        }
    }
}