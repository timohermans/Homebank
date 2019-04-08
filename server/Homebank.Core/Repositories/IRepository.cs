using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homebank.Core.Repositories
{
    public interface IRepository<TEntity>
    {
        Task<TEntity> GetBy(int id);
        Task CreateMultiple(IList<TEntity> entity);
        Task SaveChanges();
        Task<TEntity> GetBy(System.Linq.Expressions.Expression<System.Func<TEntity, bool>> expression);
        Task Create(TEntity entity);
    }
}
