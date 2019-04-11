using Homebank.Core.Dto.Categories;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Homebank.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CategoryController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost]
        public async Task<IActionResult> Create(NewCategoryRequest request)
        {
            var response = await _mediator.Send(request);

            return Created($"category/{response.Id}", response);
        }

        [HttpPut]
        public async Task<IActionResult> Create(UpdateCategoryRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}