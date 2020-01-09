using System.Collections.Generic;
using Homebank.Api.Domain.Entities;

namespace Homebank.Api.Infrastructure.Converters
{
    public interface IRabobankCsvConverter
    {
        IEnumerable<Transaction> Convert(byte[] fileBytes);
    }
}