using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homebank.Core.Repositories
{
    public interface IRepository<TEntity>
    {
        Task<TEntity> GetBy(int id);
        Task CreateMultiple(IList<TEntity> entity);
        Task Create(TEntity entity);
    }
}
