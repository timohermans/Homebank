using Homebank.Core.Domain.Entities;
using Homebank.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homebank.Infrastructure.Repositories
{
    public class TransactionRepository : Repository<Transaction>, ITransactionRepository
    {
        public IQueryable<Transaction> Transactions => Entities
            .Include(transaction => transaction.Category.CategoryGroup)
            .OrderByDescending(transaction => transaction.Date);

        public TransactionRepository(AppDbContext context) : base(context)
        {
        }

        public new async Task<IEnumerable<Transaction>> GetAll()
        {
            return await Transactions.ToListAsync();
        }
    }
}