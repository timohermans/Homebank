using Homebank.Api.Domain.Entities;
using System.Collections.Generic;

namespace Homebank.Api.Converters
{
    public interface IRabobankCsvConverter
    {
        IEnumerable<Transaction> Convert(byte[] fileBytes);
    }
}