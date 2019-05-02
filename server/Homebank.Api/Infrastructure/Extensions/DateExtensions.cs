using System;

namespace Homebank.Api.Infrastructure.Extensions
{
    public static class DateExtensions
    {
        public static bool IsSameMonthAndYear(this DateTime date, DateTime dateToCheck)
        {
            return date.Year == dateToCheck.Year && date.Month == dateToCheck.Month;
        }

        public static DateTime ToMonthDate(this DateTime date)
        {
            return new DateTime(date.Year, date.Month, 1);
        }

        public static DateTime ToEndOfMonthDate(this DateTime date)
        {
            return new DateTime(date.Year, date.Month, 1).AddMonths(1).AddDays(-1);
        }
    }
}
