using Homebank.Core.Domain.Entities;
using Homebank.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Homebank.Infrastructure.Repositories
{
    public class CategoryGroupRepository : Repository<CategoryGroup>, ICategoryGroupRepository
    {
        public CategoryGroupRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<CategoryGroup> GetBy(string name)
        {
            return await Entities.FirstOrDefaultAsync(category => category.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
        }
    }
}