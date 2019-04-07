using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homebank.Core.Repositories
{
    public interface IRepository<TEntity>
    {
        Task CreateMultiple(IList<TEntity> entity);
        Task SaveChanges();
    }
}
