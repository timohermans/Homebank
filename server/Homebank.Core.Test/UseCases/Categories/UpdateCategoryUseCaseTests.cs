using FakeItEasy;
using Homebank.Core.Domain.Entities;
using Homebank.Core.Dto.Categories;
using Homebank.Core.Test.Extensions;
using Homebank.Core.UseCases.Categories;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Homebank.Core.Test.UseCases.Categories
{
    public class UpdateCategoryUseCaseTests
    {
        private IUnitOfWork _unitOfWorkFake;

        [Fact]
        public async Task Handle_ValidRequestWithNewGroup_ReturnsResponse()
        {
            #region arrange
            int categoryId = 1;
            var newCategoryName = "Category 2";
            var newGroupId = 2;

            _unitOfWorkFake = A.Fake<IUnitOfWork>();
            var categoryFromDb = CreateCategory(categoryId);
            var newGroup = CreateCategoryGroup(newGroupId);
            var usecase = new UpdateCategoryUseCase(_unitOfWorkFake);
            #endregion

            #region act
            var response = await usecase.Handle(new UpdateCategoryRequest { Id = categoryId, Name = newCategoryName, CategoryGroupId = newGroupId },
                                                new CancellationToken());
            #endregion

            #region assert
            A.CallTo(() => _unitOfWorkFake.Complete()).MustHaveHappenedOnceExactly();
            Assert.Equal(newCategoryName, response.Name);
            Assert.Equal(newGroup.Name, response.GroupName);
            #endregion
        }

        private Category CreateCategory(int categoryId)
        {
            var categoryGroupFromDb = new CategoryGroup($"Group for {categoryId}");
            var categoryFromDb = new Category($"Category {categoryId}", categoryGroupFromDb);
            categoryFromDb.SetTestId(categoryId);
            A.CallTo(() => _unitOfWorkFake.Categories.GetWithGroupByAsync(categoryId)).Returns(Task.FromResult(categoryFromDb));
            return categoryFromDb;
        }

        private CategoryGroup CreateCategoryGroup(int id)
        {
            var newGroup = new CategoryGroup($"Group {id}");
            newGroup.SetTestId(id);
            A.CallTo(() => _unitOfWorkFake.CategoryGroups.GetBy(id)).Returns(Task.FromResult(newGroup));
            return newGroup;
        }
    }
}
