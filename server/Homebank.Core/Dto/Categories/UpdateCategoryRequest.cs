using MediatR;

namespace Homebank.Core.Dto.Categories
{
    public class UpdateCategoryRequest : IRequest<CategoryResponse>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}