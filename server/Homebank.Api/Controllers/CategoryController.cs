using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Homebank.Core.Dto.Categories;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}