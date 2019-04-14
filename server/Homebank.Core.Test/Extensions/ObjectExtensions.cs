using Homebank.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Homebank.Core.Test.Extensions
{
    public static class ObjectExtensions
    {
        public static void SetTestId(this BaseEntity entity, int id)
        {
            typeof(BaseEntity).GetProperty(nameof(BaseEntity.Id)).SetValue(entity, id);
        }
    }
}
