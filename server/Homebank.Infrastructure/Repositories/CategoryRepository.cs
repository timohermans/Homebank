using Homebank.Core.Domain.Entities;
using Homebank.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homebank.Infrastructure.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Category> GetBy(string name)
        {
            return await Entities.FirstOrDefaultAsync(category => category.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
        }

        public async Task<Category> GetWithGroupByAsync(int id)
        {
            return await Entities
                            .Include(category => category.CategoryGroup)
                            .SingleOrDefaultAsync(category => category.Id == id);
        }
    }
}