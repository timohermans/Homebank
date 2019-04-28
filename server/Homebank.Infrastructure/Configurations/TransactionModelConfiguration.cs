using Homebank.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Homebank.Infrastructure.Configurations
{
    public class TransactionModelConfiguration : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.Metadata
                .FindNavigation(nameof(Transaction.Category))
                .SetPropertyAccessMode(PropertyAccessMode.Field);

            builder
                .HasIndex(transaction => new { transaction.Date, transaction.Payee, transaction.Memo, transaction.Inflow, transaction.OutFlow })
                .IsUnique();
        }
    }
}