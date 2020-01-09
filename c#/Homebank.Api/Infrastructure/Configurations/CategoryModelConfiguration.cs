using Homebank.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Homebank.Api.Infrastructure.Configurations
{
    public class CategoryModelConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.Metadata
                .FindNavigation(nameof(Category.Transactions))
                .SetPropertyAccessMode(PropertyAccessMode.Field);

            builder.Metadata
                .FindNavigation(nameof(Category.Budgets))
                .SetPropertyAccessMode(PropertyAccessMode.Field);
        }
    }
}