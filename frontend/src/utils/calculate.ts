import type { CalculationInput, CalculationResult } from '../types'

export function calculate(input: CalculationInput): CalculationResult {
  const totalUnits = input.packageCount * input.unitsPerPackage
  const totalPurchaseCost = input.packageCount * input.purchasePricePerPackage
  const totalSalesValue = totalUnits * input.sellingPricePerUnit
  const costPerUnit = totalPurchaseCost / totalUnits
  const totalProfit = totalSalesValue - totalPurchaseCost

  return {
    totalUnits,
    totalPurchaseCost,
    costPerUnit,
    totalSalesValue,
    profitPerUnit: input.sellingPricePerUnit - costPerUnit,
    totalProfit,
    profitMargin: totalSalesValue === 0 ? 0 : (totalProfit / totalSalesValue) * 100,
  }
}
