using MediatR;
using System.ComponentModel.DataAnnotations;

namespace Homebank.Core.Dto.CategoryGroups
{
    public class UpdateCategoryGroupRequest : IRequest<CategoryGroupResponse>
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}