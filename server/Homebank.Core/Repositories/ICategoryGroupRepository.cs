using Homebank.Core.Domain.Entities;
using System.Threading.Tasks;

namespace Homebank.Core.Repositories
{
    public interface ICategoryGroupRepository : IRepository<CategoryGroup>
    {
        Task<CategoryGroup> GetBy(string name);
    }
}