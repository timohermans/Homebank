using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlClient;
using System.Linq;

namespace Homebank.Infrastructure.Extensions
{
    public static class ExceptionExtensions
    {
        private static readonly Dictionary<int, string> _sqlErrorTextDict =
            new Dictionary<int, string>
            {
                {547,
                 "This operation failed because another data entry uses this entry."},
                {2601,
                 "One of the properties is marked as Unique index and there is already an entry with that value."}
            };

        private static readonly IEnumerable<int> _errorCodesToIgnore = new List<int>
        {
            3621
        };

        public static IEnumerable<ValidationResult> ToValidationErrors(this DbUpdateException ex)
        {
            if (!(ex.InnerException is SqlException))
            {
                return null;
            }

            var sqlException = (SqlException)ex.InnerException;

            var result = new List<ValidationResult>();
            foreach (SqlError sqlError in sqlException.Errors)
            {
                var errorNum = sqlError.Number;
                string errorText;

                if (_sqlErrorTextDict.TryGetValue(errorNum, out errorText))
                {
                    result.Add(new ValidationResult(errorText));
                }
                else if (!_errorCodesToIgnore.Contains(errorNum))
                {
                    throw new NotImplementedException($"SQL error {errorNum} has occurred, but hasn't been handled", ex);
                }
                
            }
            return result.Any() ? result : null;
        }
    }
}