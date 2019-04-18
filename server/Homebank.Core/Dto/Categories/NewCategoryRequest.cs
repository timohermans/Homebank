using MediatR;
using System.ComponentModel.DataAnnotations;

namespace Homebank.Core.Dto.Categories
{
    public class NewCategoryRequest : IRequest<CategoryResponse>
    {
        [Required]
        public string CategoryName { get; set; }

        [Required]
        public string CategoryGroupName { get; set; }
    }
}