using Homebank.Core.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace Homebank.Core.Repositories
{
    public interface IBudgetRepository : IRepository<Budget>
    {
        Task<System.Collections.Generic.IList<Budget>> GetWithTransactionsBy(DateTime month);

        Task<Budget> GetByAsync(int categoryId, DateTime month);
    }
}