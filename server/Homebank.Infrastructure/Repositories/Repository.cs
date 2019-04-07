using Homebank.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Homebank.Infrastructure.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity>
    {
        private readonly AppDbContext _context;

        public Task CreateMultiple(IList<TEntity> entity)
        {
            throw new NotImplementedException();
        }

        public Task SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}
