using Homebank.Core.Domain.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Homebank.Core.Domain.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; private set; }
        public CategoryGroup CategoryGroup { get; private set; }

        private HashSet<Transaction> _transactions;
        public IEnumerable<Transaction> Transactions => _transactions?.ToList();

        private HashSet<Budget> _budgets;
        public IEnumerable<Budget> Budgets => _budgets?.ToList();

        private Category()
        {
        }

        public Category(string name, CategoryGroup categoryGroup)
        {
            ChangeNameWith(name);
            CategoryGroup = categoryGroup ?? throw new ArgumentNullException(nameof(categoryGroup));
        }

        public Category(string name, CategoryGroup categoryGroup, IEnumerable<Transaction> transactionsToAssignTo) : this(name, categoryGroup)
        {
            foreach (var transaction in transactionsToAssignTo)
            {
                transaction.AssignCategory(this);
            }

            _transactions = new HashSet<Transaction>(transactionsToAssignTo);
        }

        public void ChangeNameWith(string name)
        {
            var minLength = 1;
            var maxLength = 50;
            Guard.AgainstNull(name, nameof(name));
            Guard.AgainstLength(name.Length, minLength, maxLength, nameof(name));

            Name = name;
        }

        public void AssignTo(CategoryGroup groupToAssignTo)
        {
            Guard.AgainstNull(groupToAssignTo, nameof(CategoryGroup));
            Guard.AgainstDefaultValue(groupToAssignTo.Id, "Category group must be created before assigning the category to it");
            CategoryGroup = groupToAssignTo;
        }

        public void EnsureTransactionsAreFrom(DateTime month)
        {
            // EF Core doesn't support filtering on includes. 
            _transactions = new HashSet<Transaction>(
                _transactions
                .Where(transaction => transaction.Date.Year == month.Year && transaction.Date.Month == month.Month)
                );
        }
    }
}