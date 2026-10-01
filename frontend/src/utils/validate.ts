import type { CalculationInput } from '../types'

export interface FormValues {
  productName: string
  packageType: string
  customPackageType: string
  packageCount: string
  unitsPerPackage: string
  purchasePricePerPackage: string
  sellingPricePerUnit: string
}

export type FormErrors = Partial<Record<keyof FormValues, string>>

export const PACKAGE_TYPES = ['Carton', 'Box', 'Pack', 'Dozen', 'Bundle']
export const CUSTOM = 'Custom'
export const emptyForm: FormValues = {
  productName: '',
  packageType: 'Carton',
  customPackageType: '',
  packageCount: '',
  unitsPerPackage: '',
  purchasePricePerPackage: '',
  sellingPricePerUnit: '',
}

const MAX_NUMBER = 1_000_000_000

function checkNumber(raw: string, label: string, min: number, allowZero: boolean): string | undefined {
  if (raw.trim() === '') return `${label} is required`
  const value = Number(raw)
  if (!Number.isFinite(value)) return `${label} must be a number`
  if (value < 0) return `${label} cannot be negative`
  if (value === 0 && !allowZero) return `${label} must be more than 0`
  if (value < min) return `${label} is too small`
  if (value > MAX_NUMBER) return `${label} is too large`
}

export function validate(values: FormValues): { input?: CalculationInput; errors: FormErrors } {
  const errors: FormErrors = {
    productName: values.productName.trim() ? undefined : 'Product name is required',
    customPackageType:
      values.packageType === CUSTOM && !values.customPackageType.trim() ? 'Enter a package name' : undefined,
    packageCount: checkNumber(values.packageCount, 'Number of packages', 0, false),
    unitsPerPackage: checkNumber(values.unitsPerPackage, 'Units per package', 0, false),
    purchasePricePerPackage: checkNumber(values.purchasePricePerPackage, 'Purchase price', 0, true),
    sellingPricePerUnit: checkNumber(values.sellingPricePerUnit, 'Selling price', 0, true),
  }
  const hasErrors = Object.values(errors).some(Boolean)
  if (hasErrors) return { errors }

  return {
    errors,
    input: {
      productName: values.productName.trim(),
      packageType: values.packageType === CUSTOM ? values.customPackageType.trim() : values.packageType,
      packageCount: Number(values.packageCount),
      unitsPerPackage: Number(values.unitsPerPackage),
      purchasePricePerPackage: Number(values.purchasePricePerPackage),
      sellingPricePerUnit: Number(values.sellingPricePerUnit),
    },
  }
}

export function toFormValues(input: CalculationInput): FormValues {
  const isPreset = PACKAGE_TYPES.includes(input.packageType)
  return {
    productName: input.productName,
    packageType: isPreset ? input.packageType : CUSTOM,
    customPackageType: isPreset ? '' : input.packageType,
    packageCount: String(input.packageCount),
    unitsPerPackage: String(input.unitsPerPackage),
    purchasePricePerPackage: String(input.purchasePricePerPackage),
    sellingPricePerUnit: String(input.sellingPricePerUnit),
  }
}
