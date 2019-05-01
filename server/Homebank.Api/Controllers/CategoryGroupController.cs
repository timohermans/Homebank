using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Homebank.Api.UseCases.CategoryGroups;

namespace Homebank.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryGroupController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CategoryGroupController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Create.Command request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpPut]
        public async Task<IActionResult> Update(Update.Command request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}