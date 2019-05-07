using FakeItEasy;
using Homebank.Api.Domain.Entities;
using Homebank.Api.UseCases.CategoryGroups;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

using static Homebank.Core.Test.SliceFixture;

namespace Homebank.Core.Test.UseCases.CategoryGroups
{
    public class UpdateCategoryGroupUseCaseTests
    {
        private async Task SetupUnitOfWorkFakeAsync(CategoryGroup groupToReturnFromGet)
        {
            await ClearDatabaseAsync();
            await InsertAsync(groupToReturnFromGet);
        }

        [Fact]
        public async Task Handle_ValidRequest_ReturnsResponse()
        {
            var groupName = "Group 1";
            await SetupUnitOfWorkFakeAsync(new CategoryGroup(groupName));
            var groupInDb = await ExecuteDbContextAsync(async context => await context.CategoryGroups.FirstOrDefaultAsync(group => group.Name == groupName));

            var newGroupName = "Group 1 updated";

            var response = await SendAsync(new Update.Command { Id = groupInDb.Id, Name = newGroupName });

            var updatedGroup = await FindAsync<CategoryGroup>(groupInDb.Id);
            Assert.Equal(newGroupName, response.Name);
        }

        [Fact]
        public async Task Handle_NonExistingGroup_ThrowsException()
        {
            var groupId = 999;

            await Assert.ThrowsAsync<ArgumentNullException>(async () =>
             {
                 await SendAsync(new Update.Command { Id = groupId, Name = "hoho" });
             });
        }
    }
}