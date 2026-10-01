using StockSplit.Api.Models;

namespace StockSplit.Api.Services;

public static class CalculationService
{
    public static Calculation Calculate(CalculationRequest request)
    {
        var totalUnits = request.PackageCount * request.UnitsPerPackage;
        var totalCost = request.PackageCount * request.PurchasePricePerPackage;
        var totalSales = totalUnits * request.SellingPricePerUnit;
        var costPerUnit = totalCost / totalUnits;
        var totalProfit = totalSales - totalCost;

        return new Calculation
        {
            ProductName = request.ProductName.Trim(),
            PackageType = request.PackageType.Trim(),
            PackageCount = request.PackageCount,
            UnitsPerPackage = request.UnitsPerPackage,
            PurchasePricePerPackage = request.PurchasePricePerPackage,
            SellingPricePerUnit = request.SellingPricePerUnit,
            TotalUnits = totalUnits,
            TotalPurchaseCost = totalCost,
            CostPerUnit = costPerUnit,
            TotalSalesValue = totalSales,
            ProfitPerUnit = request.SellingPricePerUnit - costPerUnit,
            TotalProfit = totalProfit,
            ProfitMargin = totalSales == 0 ? 0 : totalProfit / totalSales * 100,
            CreatedAt = DateTime.UtcNow
        };
    }
}
