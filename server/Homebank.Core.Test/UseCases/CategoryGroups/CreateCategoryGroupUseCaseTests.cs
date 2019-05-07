using Homebank.Api.Domain.Entities;
using Homebank.Api.UseCases.CategoryGroups;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Xunit;

using static Homebank.Core.Test.SliceFixture;

namespace Homebank.Core.Test.UseCases.CategoryGroups
{
    public class CreateCategoryGroupUseCaseTests
    {
        private async Task ArrangeWith(CategoryGroup groupToReturnFromGet)
        {
            if (groupToReturnFromGet != null)
            {
                await InsertAsync(groupToReturnFromGet);
            }
        }

        [Fact]
        public async Task Handle_ValidRequest_ReturnsResponse()
        {
            var groupName = "Group 1";
            var response = await SendAsync(new Create.Command { Name = groupName });

            var categoryGroup = await ExecuteDbContextAsync(context => context.CategoryGroups.FirstOrDefaultAsync(group => group.Name == groupName));
            Assert.NotNull(categoryGroup);
        }

        [Fact]
        public async Task Handle_ExistingGroupName_ThrowsException()
        {
            var groupName = "Group Existing";
            await ArrangeWith(new CategoryGroup(groupName));

            await Assert.ThrowsAsync<ArgumentException>(async () => await SendAsync(new Create.Command { Name = groupName }));
        }
    }
}