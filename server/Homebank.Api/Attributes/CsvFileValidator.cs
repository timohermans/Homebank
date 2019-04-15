using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Homebank.Api.Attributes
{
    public class CsvFileValidator : ValidationAttribute
    {
        private readonly string[] AllowedContentTypes = { "application/csv", "application/vnd.ms-excel" };

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (!(value is IFormFile))
            {
                throw new InvalidOperationException("You should only place this validator on IFormFile");
            }

            var file = (value as List<IFormFile>).FirstOrDefault();

            if (!AllowedContentTypes.Contains(file?.ContentType))
            {
                return new ValidationResult("Must be a valid file");
            }

            return ValidationResult.Success;
        }
    }
}
