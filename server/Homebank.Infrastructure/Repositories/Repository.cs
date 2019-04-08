using Homebank.Core.Domain.Entities;
using Homebank.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
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

        private DbSet<TEntity> Entities => _context.Set<TEntity>();

        public async Task<TEntity> GetBy(int id)
        {
            return await Entities.FindAsync(id);
        }

        public async Task<TEntity> GetBy(Expression<Func<TEntity, bool>> expression)
        {
            return await Entities.FirstOrDefaultAsync(expression);
        }

        public async Task Create(TEntity entity)
        {
            await Entities.AddAsync(entity);
        }

        public Task CreateMultiple(IList<TEntity> entity)
        {
            throw new NotImplementedException();
        }

        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
    }
}
