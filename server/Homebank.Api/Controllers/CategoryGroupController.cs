using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Homebank.Core.Dto.CategoryGroups;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> Create(CreateCategoryGroupRequest request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateCategoryGroupRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}