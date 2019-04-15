using System;
using System.Collections.Generic;
using System.Text;
using System.Transactions;

namespace Homebank.Core.Converters
{
    public interface IRabobankCsvConverter
    {
        IEnumerable<Transaction> Convert();
    }
}
