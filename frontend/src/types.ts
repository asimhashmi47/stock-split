export interface CalculationInput {
  productName: string
  packageType: string
  packageCount: number
  unitsPerPackage: number
  purchasePricePerPackage: number
  sellingPricePerUnit: number
}

export interface CalculationResult {
  totalUnits: number
  totalPurchaseCost: number
  costPerUnit: number
  totalSalesValue: number
  profitPerUnit: number
  totalProfit: number
  profitMargin: number
}

export interface SavedCalculation extends CalculationInput, CalculationResult {
  id: number
  createdAt: string
}
