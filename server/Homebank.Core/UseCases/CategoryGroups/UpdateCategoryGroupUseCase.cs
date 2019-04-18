using Homebank.Core.Domain.Entities;
using Homebank.Core.Domain.Helpers;
using Homebank.Core.Dto.CategoryGroups;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.CategoryGroups
{
    public class UpdateCategoryGroupUseCase : IRequestHandler<UpdateCategoryGroupRequest, CategoryGroupResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public UpdateCategoryGroupUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CategoryGroupResponse> Handle(UpdateCategoryGroupRequest request, CancellationToken cancellationToken)
        {
            var group = await _unitOfWork.CategoryGroups.GetBy(request.Id);

            Guard.AgainstNull(group, nameof(CategoryGroup));

            group.ChangeNameWith(request.Name);

            await _unitOfWork.Complete();

            return new CategoryGroupResponse
            {
                Id = group.Id,
                Name = group.Name
            };
        }
    }
}