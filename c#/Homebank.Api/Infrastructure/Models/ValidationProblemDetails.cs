using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Homebank.Api.Infrastructure.Models
{
    public class ValidationProblemDetails : ProblemDetails
    {
        public ICollection<ValidationError> ValidationErrors { get; set; }
    }
}