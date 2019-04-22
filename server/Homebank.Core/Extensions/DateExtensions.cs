using System;
using System.Collections.Generic;
using System.Text;

namespace Homebank.Core.Extensions
{
    public static class DateExtensions
    {
        public static bool IsSameMonthAndYear(this DateTime date, DateTime dateToCheck)
        {
            return date.Year == dateToCheck.Year && date.Month == dateToCheck.Month;
        }
    }
}
