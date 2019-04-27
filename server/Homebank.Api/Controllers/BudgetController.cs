using Homebank.Core.Dto.Budgets;
using Homebank.Core.Dto.Categories;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Homebank.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BudgetController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("{month:datetime}")]
        public async Task<IActionResult> GetMonth([FromRoute]BudgetOfMonthRequest request)
        {
            var response = await _mediator.Send(request);

            return Ok(response);
        }

        [HttpGet("total-balance/{month:datetime}")]
        public async Task<IActionResult> GetBalanceOfMonth([FromRoute]TotalBudgetBalanceRequest request)
        {
            var response = await _mediator.Send(request);

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> SetBudget(AssignBudgetRequest request)
        {
            var response = await _mediator.Send(request);

            return Ok(response);
        }
    }
}