using Homebank.Core.Domain.Entities;
using Homebank.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
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

        public async Task<IEnumerable<Transaction>> GetUncategorizedBy(DateTime month)
        {
            return await Transactions
                    .Where(transaction => transaction.Date.Year == month.Year && transaction.Date.Month == month.Month
                        && transaction.Category == null)
                    .ToListAsync();
        }
    }
}