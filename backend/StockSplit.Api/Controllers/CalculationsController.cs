using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockSplit.Api.Data;
using StockSplit.Api.Models;
using StockSplit.Api.Services;

namespace StockSplit.Api.Controllers;

[ApiController]
[Route("api/calculations")]
public class CalculationsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<List<Calculation>> GetAll() =>
        await db.Calculations.AsNoTracking().OrderByDescending(c => c.CreatedAt).ToListAsync();

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Calculation>> Get(int id)
    {
        var calculation = await db.Calculations.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
        return calculation is null ? NotFound() : calculation;
    }

    [HttpPost]
    public async Task<ActionResult<Calculation>> Create(CalculationRequest request)
    {
        var calculation = CalculationService.Calculate(request);
        db.Calculations.Add(calculation);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = calculation.Id }, calculation);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await db.Calculations.Where(c => c.Id == id).ExecuteDeleteAsync();
        return deleted == 0 ? NotFound() : NoContent();
    }
}
