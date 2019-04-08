using Homebank.Core.Domain.Helpers;
using System;

namespace Homebank.Core.Domain.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; private set; }
        public CategoryGroup CategoryGroup { get; private set; }

        private Category() { }
        public Category(string name, CategoryGroup categoryGroup)
        {
            UpdateNameWith(name);
            CategoryGroup = categoryGroup ?? throw new ArgumentNullException(nameof(categoryGroup));
        }

        public void UpdateNameWith(string name)
        {
            var minLength = 1;
            var maxLength = 50;
            Guard.AgainstNull(name, nameof(name));
            Guard.AgainstLength(name.Length, minLength, maxLength, nameof(name));
           
            Name = name;
        }
    }
}
