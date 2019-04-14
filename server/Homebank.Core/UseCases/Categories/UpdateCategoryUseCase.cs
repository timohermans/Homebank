using Homebank.Core.Domain.Entities;
using Homebank.Core.Domain.Helpers;
using Homebank.Core.Dto.Categories;
using Homebank.Core.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.Categories
{
    public class UpdateCategoryUseCase : IRequestHandler<UpdateCategoryRequest, CategoryResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public UpdateCategoryUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CategoryResponse> Handle(UpdateCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.Categories.GetWithGroupByAsync(request.Id);
            Guard.AgainstNull(category, nameof(Category));

            category.ChangeNameWith(request.Name);
            await ChangeGroup(category, request.CategoryGroupId);

            await _unitOfWork.Complete();
            return new CategoryResponse(category.Id, category.Name, category.CategoryGroup.Name);
        }

        private async Task ChangeGroup(Category category, int newGroupId)
        {
            if (category.CategoryGroup.Id == newGroupId)
            {
                return;
            }

            var groupToAssignTo = await _unitOfWork.CategoryGroups.GetBy(newGroupId);
            category.AssignTo(groupToAssignTo);
        }
    }
}
