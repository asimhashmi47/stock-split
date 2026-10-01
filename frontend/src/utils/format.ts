const CURRENCY = import.meta.env.VITE_CURRENCY ?? 'PKR'

const money = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const count = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })

export const formatMoney = (value: number) => `${value < 0 ? '-' : ''}${CURRENCY} ${money.format(Math.abs(value))}`
export const formatCount = (value: number) => count.format(value)
export const formatPercent = (value: number) => `${value.toFixed(2)}%`
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
