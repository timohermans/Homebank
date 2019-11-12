using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using System.Text;

namespace Homebank.Api.Infrastructure.Extensions
{
  public static class HttpExtensions
  {
    private static readonly JsonSerializer Serializer = new JsonSerializer
    {
      NullValueHandling = NullValueHandling.Ignore
    };

    public static IActionResult ToHttpResponse(this object entity)
    {
      if (entity == null)
      {
        return new NotFoundObjectResult(entity);
      }

      return new OkObjectResult(entity);
    }

    public static void WriteJson<T>(this HttpResponse response, T obj, string contentType = null)
    {
      response.ContentType = contentType ?? "application/json";
      using (var writer = new HttpResponseStreamWriter(response.Body, Encoding.UTF8))
      {
        using (var jsonWriter = new JsonTextWriter(writer))
        {
          jsonWriter.CloseOutput = false;
          jsonWriter.AutoCompleteOnClose = false;

          Serializer.Serialize(jsonWriter, obj);
        }
      }
    }
  }
}