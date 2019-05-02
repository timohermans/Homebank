using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Homebank.Api.Infrastructure.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Homebank.Api.Infrastructure.Models
{
    public class ValidationProblemDetailsResult : IActionResult
    {
        public Task ExecuteResultAsync(ActionContext context)
        {
            var modelStateEntries = context.ModelState.Where(e => e.Value.Errors.Count > 0).ToArray();
            var errors = new List<ValidationError>();

            var details = "See ValidationErrors for details";

            if (modelStateEntries.Any())
            {
                if (modelStateEntries.Length == 1 && modelStateEntries[0].Value.Errors.Count == 1 && modelStateEntries[0].Key == string.Empty)
                {
                    details = modelStateEntries[0].Value.Errors[0].ErrorMessage;
                }
                else
                {
                    foreach (var modelStateEntry in modelStateEntries)
                    {
                        foreach (var modelStateError in modelStateEntry.Value.Errors)
                        {
                            var error = new ValidationError
                            {
                                Name = modelStateEntry.Key,
                                Description = modelStateError.ErrorMessage
                            };

                            errors.Add(error);
                        }
                    }
                }
            }

            var problemDetails = new ValidationProblemDetails
            {
                Status = 400,
                Title = "Request Validation Error",
                Instance = $"urn:homebank:badrequest:{Guid.NewGuid()}",
                Detail = details,
                ValidationErrors = errors
            };

            context.HttpContext.Response.WriteJson(problemDetails);
            return Task.CompletedTask;
        }
    }
}