using Homebank.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Homebank.Infrastructure.Converters
{
    public abstract class BaseCsvConverter : IDisposable
    {
        protected readonly string[] Seperator = new[] { "\",\"" };
        protected StreamReader reader;

        public BaseCsvConverter(string filePath)
        {
            reader = new StreamReader(filePath);
        }

        public abstract IEnumerable<Transaction> Convert(); 

        public void Dispose()
        {
            reader.Dispose();
        }
    }
}
