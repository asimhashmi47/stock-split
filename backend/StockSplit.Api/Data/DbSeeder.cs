using StockSplit.Api.Models;
using StockSplit.Api.Services;

namespace StockSplit.Api.Data;

public static class DbSeeder
{
    private record Item(string Product, string Package, decimal Packages, decimal Units, decimal Price, decimal Selling);

    private static readonly Item[] Items =
    [
        new("Coca Cola 1.5L", "Carton", 5, 6, 1080, 230),
        new("Coca Cola 345ml", "Carton", 5, 24, 1800, 90),
        new("Pepsi 345ml", "Carton", 4, 24, 1750, 85),
        new("Sprite 1L", "Carton", 3, 12, 1260, 130),
        new("Fanta 500ml", "Carton", 4, 12, 900, 90),
        new("Nestle Pure Water 1.5L", "Pack", 10, 6, 330, 70),
        new("Nestle Pure Water 500ml", "Carton", 6, 12, 420, 45),
        new("Lays Classic Chips", "Box", 8, 24, 1440, 70),
        new("Kurkure Masala", "Box", 6, 36, 1620, 55),
        new("Pringles Original", "Box", 4, 12, 3000, 290),
        new("Oreo Biscuits", "Box", 5, 24, 1920, 95),
        new("Peek Freans Gluco", "Box", 6, 12, 540, 55),
        new("Candyland Chocolate Bar", "Box", 10, 24, 1200, 60),
        new("Cadbury Dairy Milk", "Box", 4, 20, 2400, 150),
        new("Nestle Milk Pack 1L", "Carton", 8, 12, 2280, 210),
        new("Olpers Milk 1L", "Carton", 6, 12, 2160, 200),
        new("Dairy Omung Cream", "Pack", 12, 6, 420, 80),
        new("Tapal Danedar Tea 190g", "Dozen", 5, 12, 3600, 340),
        new("Lipton Yellow Label 95g", "Dozen", 6, 12, 2400, 220),
        new("Nescafe Classic 50g", "Dozen", 3, 12, 6000, 540),
        new("National Salt 800g", "Dozen", 4, 12, 780, 75),
        new("Shan Biryani Masala", "Dozen", 10, 12, 1560, 140),
        new("Shan Karahi Masala", "Dozen", 6, 12, 1440, 130),
        new("Dalda Cooking Oil 1L", "Carton", 5, 12, 3900, 340),
        new("Sufi Cooking Oil 5L", "Carton", 3, 4, 6400, 1650),
        new("Rafhan Corn Oil 3L", "Carton", 4, 4, 5400, 1420),
        new("Basmati Rice 5kg", "Bundle", 10, 4, 3600, 950),
        new("Sugar 1kg", "Pack", 20, 10, 1500, 165),
        new("Atta Flour 10kg", "Bundle", 8, 2, 2900, 1500),
        new("Lux Soap", "Box", 6, 72, 4320, 70),
        new("Safeguard Soap", "Box", 5, 72, 4680, 75),
        new("Dettol Soap", "Box", 4, 48, 3840, 90),
        new("Surf Excel 1kg", "Carton", 5, 12, 4800, 420),
        new("Ariel Detergent 500g", "Carton", 6, 24, 5760, 270),
        new("Vim Dishwash Bar", "Box", 8, 36, 2160, 65),
        new("Harpic Toilet Cleaner", "Dozen", 4, 12, 3000, 270),
        new("Head & Shoulders Shampoo", "Box", 3, 12, 5400, 480),
        new("Sunsilk Shampoo 200ml", "Box", 4, 12, 3480, 310),
        new("Colgate Toothpaste", "Box", 5, 24, 4320, 190),
        new("Sensodyne Toothpaste", "Box", 2, 12, 5400, 480),
        new("Pampers Diapers M", "Pack", 10, 3, 2550, 900),
        new("Whisper Pads", "Box", 6, 24, 3600, 170),
        new("Tissue Paper Roll", "Pack", 15, 12, 1800, 160),
        new("Bic Ball Pen Blue", "Box", 12, 50, 1500, 35),
        new("Dollar Marker Black", "Dozen", 8, 12, 960, 100),
        new("A4 Copier Paper Ream", "Bundle", 10, 5, 5500, 1250),
        new("Duracell AA Batteries", "Pack", 12, 4, 880, 260),
        new("Eveready Torch Cell", "Box", 5, 24, 1920, 95),
        new("Philips LED Bulb 9W", "Box", 4, 20, 6000, 360),
        new("Local Eggs", "Dozen", 25, 1, 330, 380),
    ];

    public static void Seed(AppDbContext db)
    {
        if (db.Calculations.Any()) return;

        var now = DateTime.UtcNow;
        db.Calculations.AddRange(Items.Select((item, index) =>
        {
            var calculation = CalculationService.Calculate(new CalculationRequest
            {
                ProductName = item.Product,
                PackageType = item.Package,
                PackageCount = item.Packages,
                UnitsPerPackage = item.Units,
                PurchasePricePerPackage = item.Price,
                SellingPricePerUnit = item.Selling,
            });
            calculation.CreatedAt = now.AddHours(-index * 7);
            return calculation;
        }));
        db.SaveChanges();
    }
}
