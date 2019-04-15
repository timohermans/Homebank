using Homebank.Api.Models;
using Homebank.Core;
using Homebank.Core.Converters;
using Homebank.Infrastructure;
using Homebank.Infrastructure.Converters;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Net;
using System.Reflection;

namespace Homebank.Api.Extensions
{
    public static class StartupExtensions
    {
        public static void ConfigureDependencyInjection(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IRabobankCsvConverter, RabobankCsvConverter>();
        }

        public static void ConfigureModelStateValidation(this IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = ctx => new ValidationProblemDetailsResult();
            });
        }

        public static void SetupExceptionHandling(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    var badRequestTypes = new List<Type>
                    {
                        typeof(ArgumentException),
                        typeof(ArgumentNullException),
                        typeof(ArgumentOutOfRangeException)
                    };

                    //https://www.strathweb.com/2018/07/centralized-exception-handling-and-request-validation-in-asp-net-core/
                    var errorFeature = context.Features.Get<IExceptionHandlerFeature>();
                    var exception = errorFeature.Error;

                    // the IsTrusted() extension method doesn't exist and
                    // you should implement your own as you may want to interpret it differently
                    // i.e. based on the current principal
                    //var errorDetail = context.Request.IsTrusted()
                    //    ? exception.Demystify().ToString()
                    //    : "The instance value should be used to identify the problem when calling customer support";

                    var problemDetails = new ProblemDetails
                    {
                        Instance = $"urn:homebank:error:{Guid.NewGuid()}"
                    };

                    if (badRequestTypes.Contains(exception.GetType()))
                    {
                        problemDetails.Title = "Invalid request";
                        problemDetails.Status = (int)HttpStatusCode.BadRequest;
                        problemDetails.Detail = exception.Message;
                    }
                    else if (exception is BadHttpRequestException badHttpRequestException)
                    {
                        problemDetails.Title = "Invalid request";
                        problemDetails.Status = (int)typeof(BadHttpRequestException).GetProperty("StatusCode",
                            BindingFlags.NonPublic | BindingFlags.Instance).GetValue(badHttpRequestException);
                        problemDetails.Detail = badHttpRequestException.Message;
                    }
                    else
                    {
                        problemDetails.Title = "An unexpected error occurred!";
                        problemDetails.Status = 500;
                        problemDetails.Detail = exception.Message;
                    }

                    context.Response.StatusCode = problemDetails.Status.GetValueOrDefault((int)HttpStatusCode.InternalServerError);
                    context.Response.WriteJson(problemDetails);
                    // log the exception etc..
                    // flush problemDetails to the caller   
                });
            });
        }
    }
}
