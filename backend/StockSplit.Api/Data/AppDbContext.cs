using Microsoft.EntityFrameworkCore;
using StockSplit.Api.Models;

namespace StockSplit.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Calculation> Calculations => Set<Calculation>();
}
