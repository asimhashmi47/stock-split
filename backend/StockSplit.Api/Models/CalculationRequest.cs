using System.ComponentModel.DataAnnotations;

namespace StockSplit.Api.Models;

public class CalculationRequest
{
    [Required, StringLength(100, MinimumLength = 1)]
    public string ProductName { get; set; } = "";

    [Required, StringLength(50, MinimumLength = 1)]
    public string PackageType { get; set; } = "";

    [Range(0.0001, 1_000_000)]
    public decimal PackageCount { get; set; }

    [Range(0.0001, 1_000_000)]
    public decimal UnitsPerPackage { get; set; }

    [Range(0, 1_000_000_000)]
    public decimal PurchasePricePerPackage { get; set; }

    [Range(0, 1_000_000_000)]
    public decimal SellingPricePerUnit { get; set; }
}
