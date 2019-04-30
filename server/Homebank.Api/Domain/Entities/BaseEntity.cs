using System;

namespace Homebank.Api.Domain.Entities
{
    public abstract class BaseEntity
    {
        public int Id { get; private set; }
        public DateTime CreatedOn { get; private set; }
        public DateTime UpdatedOn { get; private set; }

        public BaseEntity()
        {
            CreatedOn = DateTime.UtcNow;
            UpdatedOn = DateTime.UtcNow;
        }
    }
}