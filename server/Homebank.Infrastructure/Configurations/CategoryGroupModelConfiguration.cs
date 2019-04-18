using Homebank.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Homebank.Infrastructure.Configurations
{
    public class CategoryGroupModelConfiguration : IEntityTypeConfiguration<CategoryGroup>
    {
        public void Configure(EntityTypeBuilder<CategoryGroup> builder)
        {
            builder.Metadata
                .FindNavigation(nameof(CategoryGroup.Categories))
                .SetPropertyAccessMode(PropertyAccessMode.Field);
        }
    }
}