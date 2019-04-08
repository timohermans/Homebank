using System;
using System.Collections.Generic;
using System.Text;

namespace Homebank.Core.Domain.Helpers
{
    public static class Guard
    {
        public static void AgainstNull(object argument, string argumentName)
        {
            if (argument == null)
            {
                throw new ArgumentNullException(argumentName);
            }
        }
        public static void AgainstLength(int value, int minLength, int maxLength, string argumentName)
        {
            if (value < minLength || value > maxLength)
            {
                throw new ArgumentOutOfRangeException(argumentName, $"{argumentName} must be between {minLength} and {maxLength}");
            }
        }
    }
}
