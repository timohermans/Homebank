using FakeItEasy;
using Homebank.Core.Domain.Entities;
using Homebank.Core.Repositories;
using Homebank.Core.UseCases.CategoryGroups;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Homebank.Core.Test.UseCases.CategoryGroups
{
    public class CreateCategoryGroupUseCaseTests
    {
        private IUnitOfWork _unitOfWorkFake;

        private void SetupUnitOfWorkFake(string categoryGroupNameToGet, CategoryGroup groupToReturnFromGet)
        {
            var categoryGroupRepo = A.Fake<ICategoryGroupRepository>();
            A.CallTo(() => categoryGroupRepo.GetBy(categoryGroupNameToGet)).Returns(Task.FromResult(groupToReturnFromGet));

            _unitOfWorkFake = A.Fake<IUnitOfWork>();
            A.CallTo(() => _unitOfWorkFake.CategoryGroups).Returns(categoryGroupRepo);
        }

        [Fact]
        public async Task Handle_ValidRequest_ReturnsResponse()
        {
            var groupName = "Group 1";
            SetupUnitOfWorkFake(groupName, null);
            A.CallTo(() => _unitOfWorkFake.Complete());

            var usecase = new CreateCategoryGroupUseCase(_unitOfWorkFake);
            var response = await usecase.Handle(new Dto.CategoryGroups.CreateCategoryGroupRequest { Name = groupName },
                                                new CancellationToken());

            A.CallTo(() => _unitOfWorkFake.Complete()).MustHaveHappenedOnceExactly();
            Assert.Equal(groupName, response.Name);
        }

        [Fact]
        public async Task Handle_ExistingGroupName_ThrowsException()
        {
            var groupName = "Group Existing";
            SetupUnitOfWorkFake(groupName, new CategoryGroup(groupName));

            var usecase = new CreateCategoryGroupUseCase(_unitOfWorkFake);
            await Assert.ThrowsAsync<ArgumentException>(async () =>
             {
                 await usecase.Handle(new Dto.CategoryGroups.CreateCategoryGroupRequest { Name = groupName }, new CancellationToken());
             });
        }
    }
}