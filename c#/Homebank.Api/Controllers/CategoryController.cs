using Homebank.Api.Infrastructure;
using Homebank.Api.Infrastructure.Extensions;
using Homebank.Api.UseCases.Categories;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Homebank.Api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CategoryController : ControllerBase
  {
    private readonly IMediator _mediator;
    private readonly AppDbContext _context;

    public CategoryController(IMediator mediator, AppDbContext context)
    {
      _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
      _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      var categories = await _context.Categories.ToListAsync();

      return categories.Select(UseCases.Categories.GetAll.Response.MapFrom).ToHttpResponse();
    }

    [HttpPost]
    public async Task<IActionResult> Create(Create.Command request)
    {
      var response = await _mediator.Send(request);

      return CreatedAtRoute("api/category", response);
    }

    [HttpPut]
    public async Task<IActionResult> Create(Update.Command request)
    {
      return Ok(await _mediator.Send(request));
    }
  }
}