using Homebank.Core.Repositories;
using System.Threading.Tasks;

namespace Homebank.Core
{
    public interface IUnitOfWork
    {
        ICategoryRepository Categories { get; }
        ICategoryGroupRepository CategoryGroups { get; }
        ITransactionRepository Transactions { get; }

        Task Complete();
    }
}
