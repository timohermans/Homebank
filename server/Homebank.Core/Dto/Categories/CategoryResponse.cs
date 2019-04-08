using System;

namespace Homebank.Core.Dto.Categories
{
    public class CategoryResponse
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string GroupName { get; private set; }

        public CategoryResponse(int id, string name, string groupName)
        {
            Id = id;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            GroupName = groupName ?? throw new ArgumentNullException(nameof(groupName));
        }
    }
}