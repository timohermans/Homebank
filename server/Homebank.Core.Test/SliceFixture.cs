using FakeItEasy;
using Homebank.Api.Domain.Entities;
using Homebank.Api.Infrastructure;
using Homebank.Api.Infrastructure.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Respawn;
using System;
using System.Threading.Tasks;

namespace Homebank.Core.Test
{
    public static class SliceFixture
    {
        private static readonly IConfiguration _configuration;
        private static readonly IServiceScopeFactory _scopeFactory;
        private static readonly Checkpoint _checkpoint;

        static SliceFixture()
        {
            _configuration = A.Fake<IConfiguration>();

            var services = new ServiceCollection().AddEntityFrameworkInMemoryDatabase();

            services.AddMediatR();
            services.ConfigureDependencyInjection();
            services.ConfigureModelStateValidation();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            var provider = services.BuildServiceProvider();

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseInMemoryDatabase("InMemoryDbForTesting");
                options.UseInternalServiceProvider(provider);
            });

            provider = services.BuildServiceProvider();
            _scopeFactory = provider.GetService<IServiceScopeFactory>();
            _checkpoint = new Checkpoint();
        }

        public static async Task ExecuteScopeAsync(Func<IServiceProvider, Task> action)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetService<AppDbContext>();

                await action(scope.ServiceProvider);
            }
        }

        public static async Task<T> ExecuteScopeAsync<T>(Func<IServiceProvider, Task<T>> action)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetService<AppDbContext>();

                return await action(scope.ServiceProvider);
            }
        }

        public static void ExecuteScope(Action<IServiceProvider> action)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                action.Invoke(scope.ServiceProvider);
            }
        }

        public static async Task ExecuteDbContextAsync(Func<AppDbContext, Task> action)
        {
            await ExecuteScopeAsync(sp => action(sp.GetService<AppDbContext>()));
        }

        public static async Task<T> ExecuteDbContextAsync<T>(Func<AppDbContext, Task<T>> action)
        {
            return await ExecuteScopeAsync(sp => action(sp.GetService<AppDbContext>()));
        }

        public static async Task InsertAsync<T>(params T[] entities) where T : class
        {
            await ExecuteDbContextAsync(async db =>
            {
                foreach (var entity in entities)
                {
                    await db.Set<T>().AddAsync(entity);
                }
                return await db.SaveChangesAsync();
            });
        }

        public static async Task<T> FindAsync<T>(int id)
            where T : BaseEntity
        {
            return await ExecuteDbContextAsync(async db => await db.Set<T>().FindAsync(id));
        }

        public static async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
        {
            return await ExecuteScopeAsync(async sp =>
            {
                var mediator = sp.GetService<IMediator>();

                return await mediator.Send(request);
            });
        }

        public static async Task SendAsync(IRequest request)
        {
            await ExecuteScopeAsync(async sp =>
            {
                var mediator = sp.GetService<IMediator>();

                return await mediator.Send(request);
            });
        }

        public static async Task ClearDatabaseAsync()
        {
            await ExecuteDbContextAsync(async context => await context.Database.EnsureDeletedAsync());
        }
    }
}