using System;
using System.ComponentModel.DataAnnotations;

namespace Homebank.Api.UseCases
{
    public abstract class BaseMonthRequest
    {
        [Required]
        public DateTime Month { get; set; }
    }
}