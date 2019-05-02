using Homebank.Api.Infrastructure.Attributes;
using Microsoft.AspNetCore.Http;

namespace Homebank.Api.Infrastructure.Models
{
    public class CsvFileUploadModel
    {
        [CsvFileValidator]
        public IFormFile File { get; set; }
    }
}