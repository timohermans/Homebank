using System;

namespace Homebank.Api.Domain.Helpers
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

        public static void AgainstNotNull(object argument, string argumentName)
        {
            if (argument != null)
            {
                throw new ArgumentException($"{argumentName} already exists");
            }
        }

        public static void AgainstLength(int value, int minLength, int maxLength, string argumentName)
        {
            if (value < minLength || value > maxLength)
            {
                throw new ArgumentOutOfRangeException(argumentName, $"{argumentName} must be between {minLength} and {maxLength}");
            }
        }

        public static void AgainstDefaultValue<T>(T value, string errorMessage)
        {
            var defaultValue = default(T);
            if (value.Equals(defaultValue))
            {
                throw new ArgumentException(errorMessage);
            }
        }
    }
}