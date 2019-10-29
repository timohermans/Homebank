using Homebank.Api.Domain.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Homebank.Api.Domain.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; private set; }

        private HashSet<Transaction> _transactions;
        public IEnumerable<Transaction> Transactions => _transactions?.ToList();

        private HashSet<Budget> _budgets;
        public IEnumerable<Budget> Budgets => _budgets?.ToList();

        private Category()
        {
        }

        public Category(string name)
        {
            ChangeNameWith(name);
            _budgets = new HashSet<Budget>();
        }

        public Category(string name, IEnumerable<Transaction> transactionsToAssignTo) : this(name)
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