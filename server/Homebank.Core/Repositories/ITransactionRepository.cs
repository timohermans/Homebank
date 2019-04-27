using Homebank.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homebank.Core.Repositories
{
    public interface ITransactionRepository : IRepository<Transaction>
    {
        Task<decimal> GetAllInflowForBudgetingFor(DateTime month);
        Task<IEnumerable<Transaction>> GetUncategorizedBy(DateTime month);
    }
}