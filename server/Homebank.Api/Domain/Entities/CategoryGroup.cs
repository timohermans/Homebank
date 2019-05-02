using Homebank.Api.Domain.Helpers;
using System.Collections.Generic;
using System.Linq;

namespace Homebank.Api.Domain.Entities
{
    public class CategoryGroup : BaseEntity
    {
        public string Name { get; private set; }

        private HashSet<Category> _categories;
        public IEnumerable<Category> Categories => _categories?.ToList();

        private CategoryGroup()
        {
        }

        public CategoryGroup(string name)
        {
            ChangeNameWith(name);
            _categories = new HashSet<Category>();
        }

        public void ChangeNameWith(string name)
        {
            var minLength = 1;
            var maxLength = 50;
            Guard.AgainstNull(name, nameof(name));
            Guard.AgainstLength(name.Length, minLength, maxLength, nameof(name));

            Name = name;
        }
    }
}