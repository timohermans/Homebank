using Homebank.Core.Domain.Entities;
using System.Collections.Generic;
using System.IO;

namespace Homebank.Infrastructure.Converters
{
    public abstract class BaseCsvConverter
    {
        protected readonly string[] Seperator = new[] { "\",\"" };
        protected StreamReader reader;

        public abstract IEnumerable<Transaction> Convert(byte[] fileBytes);
    }
}
