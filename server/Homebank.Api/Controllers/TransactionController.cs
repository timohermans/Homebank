using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Homebank.Api.Infrastructure;
using Homebank.Api.UseCases.Transactions;
using Microsoft.EntityFrameworkCore;
using Homebank.Api.Infrastructure.Extensions;

namespace Homebank.Api.Controllers
{
  // FEATURE: Document the api and show sexy shit with swagger
  [Route("api/[controller]")]
  [ApiController]
  public class TransactionController : ControllerBase
  {
    private readonly AppDbContext _context;
    private readonly IMediator _mediator;

    public TransactionController(AppDbContext context, IMediator mediator)
    {
      _context = context;
      _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      var transactions = await _context.Transactions.ToListAsync();

      return Ok(transactions.Select(UseCases.Transactions.GetAll.Response.MapFrom));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
      var transactionFound = await _context.Transactions
            .Include(transaction => transaction.Category)
            .FirstOrDefaultAsync(transaction => transaction.Id == id);

      return UseCases.Transactions.Get.Response.MapFrom(transactionFound).ToHttpResponse();
    }


    [HttpPut]
    public async Task<IActionResult> Update(Update.Command request)
    {
      var response = await _mediator.Send(request);
      return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Create.Command request)
    {
      var response = await _mediator.Send(request);
      return Created(response.Id.ToString(), response);
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadFrom([FromForm]IFormFile file)
    {
      using (var fileStream = new MemoryStream())
      {
        await file.CopyToAsync(fileStream);

        var request = new UploadFromFile.Command
        {
          TransactionFile = fileStream.ToArray()
        };

        var response = await _mediator.Send(request);
        return Ok(response);
      }
    }
  }
}