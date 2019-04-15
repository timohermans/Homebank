using Homebank.Api.Attributes;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homebank.Api.Models
{
    public class CsvFileUploadModel
    {
        [CsvFileValidator]
        public IFormFile File { get; set; }
    }
}
