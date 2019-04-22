using Homebank.Core.Domain.Entities;

namespace Homebank.Core.Repositories
{
    public interface IBudgetRepository : IRepository<Budget>
    {
        System.Threading.Tasks.Task<System.Collections.Generic.IList<Budget>> GetWithTransactionsBy(System.DateTime month);
    }
}