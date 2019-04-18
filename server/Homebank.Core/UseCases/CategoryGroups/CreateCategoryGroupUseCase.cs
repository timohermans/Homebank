using Homebank.Core.Domain.Entities;
using Homebank.Core.Domain.Helpers;
using Homebank.Core.Dto.CategoryGroups;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.CategoryGroups
{
    public class CreateCategoryGroupUseCase : IRequestHandler<CreateCategoryGroupRequest, CategoryGroupResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateCategoryGroupUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CategoryGroupResponse> Handle(CreateCategoryGroupRequest request, CancellationToken cancellationToken)
        {
            var categoryGroup = await _unitOfWork.CategoryGroups.GetBy(request.Name);

            Guard.AgainstNotNull(categoryGroup, nameof(categoryGroup));

            categoryGroup = new CategoryGroup(request.Name);
            await _unitOfWork.CategoryGroups.Create(categoryGroup);
            await _unitOfWork.Complete();

            return new CategoryGroupResponse
            {
                Id = categoryGroup.Id,
                Name = categoryGroup.Name
            };
        }
    }
}