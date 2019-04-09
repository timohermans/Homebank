using Homebank.Core.Domain.Entities;
using Homebank.Core.Domain.Helpers;
using Homebank.Core.Dto.CategoryGroups;
using Homebank.Core.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Core.UseCases.CategoryGroups
{
    public class CreateCategoryGroupUseCase : IRequestHandler<CreateCategoryGroupRequest, CategoryGroupResponse>
    {
        private readonly IRepository<CategoryGroup> _categoryGroupRepository;

        public CreateCategoryGroupUseCase(IRepository<CategoryGroup> categoryGroupRepository)
        {
            _categoryGroupRepository = categoryGroupRepository;
        }

        public async Task<CategoryGroupResponse> Handle(CreateCategoryGroupRequest request, CancellationToken cancellationToken)
        {
            var categoryGroup = await _categoryGroupRepository.GetBy(group => group.Name.Equals(request.Name, StringComparison.OrdinalIgnoreCase));

            Guard.AgainstNotNull(categoryGroup, nameof(categoryGroup));

            categoryGroup = new CategoryGroup(request.Name);
            await _categoryGroupRepository.Create(categoryGroup);
            await _categoryGroupRepository.SaveChanges();

            return new CategoryGroupResponse
            {
                Id = categoryGroup.Id,
                Name = categoryGroup.Name
            };
        }
    }
}
