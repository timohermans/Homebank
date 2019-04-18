using Homebank.Core.Domain.Entities;
using Homebank.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homebank.Infrastructure.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly AppDbContext _context;

        public Repository(AppDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        protected DbSet<TEntity> Entities => _context.Set<TEntity>();

        public async Task<TEntity> GetBy(int id)
        {
            return await Entities.FindAsync(id);
        }

        public async Task Create(TEntity entity)
        {
            await Entities.AddAsync(entity);
        }

        public async Task CreateMultiple(IList<TEntity> entities)
        {
            await Entities.AddRangeAsync(entities);
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await Entities.ToListAsync();
        }
    }
}