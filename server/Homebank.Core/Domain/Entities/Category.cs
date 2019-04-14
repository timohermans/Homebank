using Homebank.Core.Domain.Helpers;
using System;
using System.Threading.Tasks;

namespace Homebank.Core.Domain.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; private set; }
        public CategoryGroup CategoryGroup { get; private set; }

        private Category() { }
        public Category(string name, CategoryGroup categoryGroup)
        {
            ChangeNameWith(name);
            CategoryGroup = categoryGroup ?? throw new ArgumentNullException(nameof(categoryGroup));
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
    }
}
