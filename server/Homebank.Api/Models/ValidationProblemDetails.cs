using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Homebank.Api.Models
{
    public class ValidationProblemDetails : ProblemDetails
    {
        public ICollection<ValidationError> ValidationErrors { get; set; }
    }
}