using Homebank.Core.Domain.Entities;
using System.Collections.Generic;

namespace Homebank.Core.Converters
{
    public interface IRabobankCsvConverter
    {
        IEnumerable<Transaction> Convert();
    }
}
