using Homebank.Core.Domain.Entities;
using System.Threading.Tasks;

namespace Homebank.Core.Repositories
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<Category> GetBy(string name);
        Task<Category> GetWithGroupByAsync(int id);
    }
}