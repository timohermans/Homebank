using Homebank.Core.Dto.Transaction;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace Homebank.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TransactionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // TODO: Create generic use case for getting data

        [HttpPost]
        public async Task<IActionResult> CreateMultiple(CreateMultipleTransactionRequest request, CancellationToken token)
        {
            var result = await _mediator.Send(request);
            
            return Ok(result);
        }
    }
}
