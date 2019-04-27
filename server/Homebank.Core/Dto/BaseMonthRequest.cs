using System;
using System.ComponentModel.DataAnnotations;

namespace Homebank.Core.Dto
{
    public abstract class BaseMonthRequest
    {
        [Required]
        public DateTime Month { get; set; }
    }
}