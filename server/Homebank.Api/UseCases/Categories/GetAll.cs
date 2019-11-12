using Homebank.Api.Domain.Entities;

namespace Homebank.Api.UseCases.Categories
{
  public class GetAll
  {
    public class Response
    {
      public int Id { get; set; }
      public string Name { get; set; }
      public string IconName { get; set; }

      public static Response MapFrom(Category category)
      {
        return new Response
        {
          Id = category.Id,
          Name = category.Name,
          IconName = category.IconName
        };
      }
    }
  }
}