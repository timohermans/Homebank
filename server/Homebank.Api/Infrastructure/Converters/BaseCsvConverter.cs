using System.Collections.Generic;
using System.IO;
using Homebank.Api.Domain.Entities;

namespace Homebank.Api.Infrastructure.Converters
{
    public abstract class BaseCsvConverter
    {
        protected readonly string[] Seperator = new[] { "\",\"" };
        protected StreamReader reader;

        public abstract IEnumerable<Transaction> Convert(byte[] fileBytes);
    }
}