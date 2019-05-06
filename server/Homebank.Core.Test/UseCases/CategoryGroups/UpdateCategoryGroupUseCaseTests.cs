//using FakeItEasy;
//using Homebank.Core.Domain.Entities;
//using Homebank.Core.Repositories;
//using Homebank.Core.UseCases.CategoryGroups;
//using System;
//using System.Threading;
//using System.Threading.Tasks;
//using Xunit;

//namespace Homebank.Core.Test.UseCases.CategoryGroups
//{
//    public class UpdateCategoryGroupUseCaseTests
//    {
//        private IUnitOfWork _unitOfWorkFake;

//        private void SetupUnitOfWorkFake(int groupId, CategoryGroup groupToReturnFromGet)
//        {
//            var categoryGroupRepo = A.Fake<ICategoryGroupRepository>();
//            A.CallTo(() => categoryGroupRepo.GetBy(groupId)).Returns(Task.FromResult(groupToReturnFromGet));

//            _unitOfWorkFake = A.Fake<IUnitOfWork>();
//            A.CallTo(() => _unitOfWorkFake.CategoryGroups).Returns(categoryGroupRepo);
//        }

//        [Fact]
//        public async Task Handle_ValidRequest_ReturnsResponse()
//        {
//            var groupId = 1;
//            var groupName = "Group 1";
//            SetupUnitOfWorkFake(groupId, new CategoryGroup(groupName));
//            var usecase = new UpdateCategoryGroupUseCase(_unitOfWorkFake);
//            var response = await usecase.Handle(new Dto.CategoryGroups.UpdateCategoryGroupRequest { Id = groupId, Name = groupName },
//                                                new CancellationToken());

//            A.CallTo(() => _unitOfWorkFake.Complete()).MustHaveHappenedOnceExactly();
//            Assert.Equal(groupName, response.Name);
//        }

//        [Fact]
//        public async Task Handle_NonExistingGroup_ThrowsException()
//        {
//            var groupId = 999;
//            SetupUnitOfWorkFake(groupId, null);

//            var usecase = new UpdateCategoryGroupUseCase(_unitOfWorkFake);
//            await Assert.ThrowsAsync<ArgumentNullException>(async () =>
//             {
//                 await usecase.Handle(new Dto.CategoryGroups.UpdateCategoryGroupRequest { Id = groupId, Name = "hoho" }, new CancellationToken());
//             });
//        }
//    }
//}