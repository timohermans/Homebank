using Homebank.Core;
using Homebank.Core.Repositories;
using Homebank.Infrastructure.Repositories;
using System.Threading.Tasks;

namespace Homebank.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public ICategoryRepository Categories { get; private set; }
        public ICategoryGroupRepository CategoryGroups { get; private set; }
        public ITransactionRepository Transactions { get; private set; }
        public IBudgetRepository Budgets { get; private set; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            Categories = new CategoryRepository(context);
            CategoryGroups = new CategoryGroupRepository(context);
            Transactions = new TransactionRepository(context);
            Budgets = new BudgetRepository(context);
        }

        public async Task Complete()
        {
            await _context.SaveChangesAsync();
        }
    }
}