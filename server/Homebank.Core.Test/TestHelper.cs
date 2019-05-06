using FakeItEasy;
using Homebank.Api;
using Homebank.Api.Domain.Entities;
using Homebank.Api.Infrastructure;
using Homebank.Api.Infrastructure.Extensions;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Homebank.Core.Test
{
    public static class SliceFixture
    {
        private static readonly IConfiguration _configuration;
        private static readonly IServiceScopeFactory _scopeFactory;

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

        public static Task ExecuteDbContextAsync(Func<AppDbContext, Task> action)
        {
            return ExecuteScopeAsync(sp => action(sp.GetService<AppDbContext>()));
        }

        public static Task<T> ExecuteDbContextAsync<T>(Func<AppDbContext, Task<T>> action)
        {
            return ExecuteScopeAsync(sp => action(sp.GetService<AppDbContext>()));
        }

        public static Task InsertAsync<T>(params T[] entities) where T : class
        {
            return ExecuteDbContextAsync(db =>
            {
                foreach (var entity in entities)
                {
                    db.Set<T>().Add(entity);
                }
                return db.SaveChangesAsync();
            });
        }

        public static Task<T> FindAsync<T>(int id)
            where T : BaseEntity
        {
            return ExecuteDbContextAsync(db => db.Set<T>().FindAsync(id));
        }

        public static Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
        {
            return ExecuteScopeAsync(sp =>
            {
                var mediator = sp.GetService<IMediator>();

                return mediator.Send(request);
            });
        }

        public static Task SendAsync(IRequest request)
        {
            return ExecuteScopeAsync(sp =>
            {
                var mediator = sp.GetService<IMediator>();

                return mediator.Send(request);
            });
        }

        public static Task ClearDatabaseAsync()
        {
            return ExecuteScopeAsync(sp =>
            {
                var dbContext = sp.GetService<AppDbContext>();

                return Task.FromResult(dbContext.Database.EnsureDeleted());
            });
        }
    }
}
