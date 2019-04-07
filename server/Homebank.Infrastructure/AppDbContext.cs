using Homebank.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Homebank.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public DbSet<Transaction> Transactions { get; set; }
    }
}
