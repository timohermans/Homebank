using Homebank.Core;
using Homebank.Core.Dto.Transactions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Homebank.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMediator _mediator;

        public TransactionController(IUnitOfWork unitOfWork, IMediator mediator)
        {
            _unitOfWork = unitOfWork;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var transactions = await _unitOfWork.Transactions.GetAll();

            return Ok(transactions.Select(transaction => TransactionResponse.MapFrom(transaction)));
        }

        [HttpPost]
        public async Task<IActionResult> UploadFrom([FromForm]IFormFile file)
        {
            using (var fileStream = new MemoryStream())
            {
                await file.CopyToAsync(fileStream);

                var request = new RabobankTransactionFileRequest
                {
                    TransactionFile = fileStream.ToArray()
                };

                var response = await _mediator.Send(request);
                return Ok(response);
            }
        }
    }
}