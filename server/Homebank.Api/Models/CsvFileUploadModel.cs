using Homebank.Api.Attributes;
using Microsoft.AspNetCore.Http;

namespace Homebank.Api.Models
{
    public class CsvFileUploadModel
    {
        [CsvFileValidator]
        public IFormFile File { get; set; }
    }
}