using Homebank.Api.Domain.Entities;
using Homebank.Api.UseCases.Categories;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Xunit;

using static Homebank.Core.Test.SliceFixture;

namespace Homebank.Core.Test.UseCases.Categories
{
    public class UpdateCategoryUseCaseTests
    {
        [Fact]
        public async Task Handle_ValidRequestWithNewGroup_ReturnsResponse()
        {
            #region arrange
            await ClearDatabaseAsync();

            var categoryId = 1;
            var newCategoryName = "Category 2";
            var newGroupId = 2;

            var categoryFromDb = await CreateCategory(categoryId);
            var newGroup = await CreateCategoryGroup(newGroupId);

            #endregion arrange

            #region act

            var response = await SendAsync(new Update.Command { Id = categoryFromDb.Id, Name = newCategoryName, CategoryGroupId = newGroupId });
            var categoryUpdated = await ExecuteDbContextAsync(async context =>
                                    await context.Categories
                                        .Include(category => category.CategoryGroup)
                                        .FirstOrDefaultAsync(category => category.Name == newCategoryName));

            #endregion act

            #region assert

            Assert.Equal(newCategoryName, categoryUpdated.Name);

            #endregion assert
        }

        private async Task<Category> CreateCategory(int categoryId)
        {
            var categoryGroupFromDb = new CategoryGroup($"Group for {categoryId}");
            var categoryFromDb = new Category($"Category {categoryId}", categoryGroupFromDb);
            await InsertAsync(categoryFromDb);
            return categoryFromDb;
        }

        private async Task<CategoryGroup> CreateCategoryGroup(int id)
        {
            var newGroup = new CategoryGroup($"Group {id}");
            await InsertAsync(newGroup);
            return newGroup;
        }
    }
}