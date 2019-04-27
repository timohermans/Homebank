using Homebank.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Homebank.Infrastructure.Configurations
{
    public class TransactionModelConfiguration : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.Metadata
                .FindNavigation(nameof(Transaction.Category))
                .SetPropertyAccessMode(PropertyAccessMode.Field);
        }
    }
}
