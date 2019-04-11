using Homebank.Core.Domain.Entities;
using Homebank.Core.Dto.Categories;
using Homebank.Core.Repositories;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.Categories
{
    public class CreateNewCategoryUseCase : IRequestHandler<NewCategoryRequest, CategoryResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateNewCategoryUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CategoryResponse> Handle(NewCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.Categories.GetBy(request.CategoryName);

            if (category != null)
            {
                throw new ArgumentException("Category already exists", nameof(request.CategoryName));
            }

            var categoryGroup = await _unitOfWork.CategoryGroups.GetBy(request.CategoryGroupName);

            if (categoryGroup == null)
            {
                categoryGroup = new CategoryGroup(request.CategoryGroupName);
            }

            category = new Category(request.CategoryName, categoryGroup);

            await _unitOfWork.Categories.Create(category);
            await _unitOfWork.Complete();

            return new CategoryResponse(category.Id, category.Name, category.CategoryGroup.Name);
        }
    }
}
