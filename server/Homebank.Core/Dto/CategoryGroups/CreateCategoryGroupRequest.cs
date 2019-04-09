using MediatR;
using System.ComponentModel.DataAnnotations;

namespace Homebank.Core.Dto.CategoryGroups
{
    public class CreateCategoryGroupRequest : IRequest<CategoryGroupResponse>
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}