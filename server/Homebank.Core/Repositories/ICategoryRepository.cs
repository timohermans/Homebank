using Homebank.Core.Domain.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homebank.Core.Repositories
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<Category> GetBy(string name);

        Task<Category> GetWithGroupByAsync(int id);
        Task<IEnumerable<Category>> GetWithoutBudgetsByAsync(DateTime month);
        Task<Category> GetWithoutBudgetByAsync(int categoryId, DateTime month);
    }
}