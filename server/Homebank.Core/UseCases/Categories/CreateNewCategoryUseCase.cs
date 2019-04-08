using Homebank.Core.Domain.Entities;
using Homebank.Core.Dto.Categories;
using Homebank.Core.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.Categories
{
    public class CreateNewCategoryUseCase : IRequestHandler<NewCategoryRequest, CategoryResponse>
    {
        private readonly IRepository<Category> _categoryRepository;
        private readonly IRepository<CategoryGroup> _categoryGroupRepository;

        public CreateNewCategoryUseCase(IRepository<Category> categoryRepository, IRepository<CategoryGroup> categoryGroupRepository)
        {
            _categoryRepository = categoryRepository ?? throw new ArgumentNullException(nameof(categoryRepository));
            _categoryGroupRepository = categoryGroupRepository ?? throw new ArgumentNullException(nameof(categoryGroupRepository));
        }

        public async Task<CategoryResponse> Handle(NewCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = await _categoryRepository.GetBy(categoryToFind => categoryToFind.Name.Equals(request.CategoryName, StringComparison.OrdinalIgnoreCase));

            if (category != null)
            {
                throw new ArgumentException("Category already exists", nameof(request.CategoryName));
            }

            var categoryGroup = await _categoryGroupRepository.GetBy(groupToFind => groupToFind.Name.Equals(request.CategoryGroupName, StringComparison.OrdinalIgnoreCase));

            if (categoryGroup == null)
            {
                categoryGroup = new CategoryGroup(request.CategoryGroupName);
            }

            category = new Category(request.CategoryName, categoryGroup);

            await _categoryRepository.Create(category);
            await _categoryRepository.SaveChanges();

            return new CategoryResponse(category.Id, category.Name, category.CategoryGroup.Name);
        }
    }
}
