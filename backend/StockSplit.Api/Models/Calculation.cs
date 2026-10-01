namespace StockSplit.Api.Models;

public class Calculation
{
    public int Id { get; set; }
    public string ProductName { get; set; } = "";
    public string PackageType { get; set; } = "";
    public decimal PackageCount { get; set; }
    public decimal UnitsPerPackage { get; set; }
    public decimal PurchasePricePerPackage { get; set; }
    public decimal SellingPricePerUnit { get; set; }
    public decimal TotalUnits { get; set; }
    public decimal TotalPurchaseCost { get; set; }
    public decimal CostPerUnit { get; set; }
    public decimal TotalSalesValue { get; set; }
    public decimal ProfitPerUnit { get; set; }
    public decimal TotalProfit { get; set; }
    public decimal ProfitMargin { get; set; }
    public DateTime CreatedAt { get; set; }
}
