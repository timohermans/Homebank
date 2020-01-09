namespace Homebank.Api.UseCases
{
  public interface IUseCaseResponse<T>
  {
    T MapFrom(object teset);
  }
}