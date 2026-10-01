using StockSplit.Api.Models;
using StockSplit.Api.Services;

namespace StockSplit.Tests;

public class CalculationServiceTests
{
    private static CalculationRequest Request(decimal packages, decimal units, decimal price, decimal selling) => new()
    {
        ProductName = "Coca Cola",
        PackageType = "Carton",
        PackageCount = packages,
        UnitsPerPackage = units,
        PurchasePricePerPackage = price,
        SellingPricePerUnit = selling
    };

    [Fact]
    public void Calculates_reference_example()
    {
        var result = CalculationService.Calculate(Request(5, 24, 1800, 90));

        Assert.Equal(120, result.TotalUnits);
        Assert.Equal(9000, result.TotalPurchaseCost);
        Assert.Equal(75, result.CostPerUnit);
        Assert.Equal(10800, result.TotalSalesValue);
        Assert.Equal(15, result.ProfitPerUnit);
        Assert.Equal(1800, result.TotalProfit);
        Assert.Equal(16.67m, Math.Round(result.ProfitMargin, 2));
    }

    [Fact]
    public void Zero_selling_price_gives_loss_and_zero_margin()
    {
        var result = CalculationService.Calculate(Request(1, 1, 50, 0));

        Assert.Equal(-50, result.TotalProfit);
        Assert.Equal(0, result.ProfitMargin);
    }

    [Fact]
    public void Selling_below_cost_gives_negative_profit()
    {
        var result = CalculationService.Calculate(Request(2, 12, 120, 8));

        Assert.Equal(10, result.CostPerUnit);
        Assert.Equal(-2, result.ProfitPerUnit);
        Assert.True(result.TotalProfit < 0);
    }

    [Fact]
    public void Handles_decimal_prices()
    {
        var result = CalculationService.Calculate(Request(1, 3, 10, 5));

        Assert.Equal(10m / 3, result.CostPerUnit);
    }
}
