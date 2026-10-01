import { motion } from 'framer-motion'
import type { CalculationResult } from '../types'
import { formatCount, formatMoney, formatPercent } from '../utils/format'

interface Props {
  result: CalculationResult | null
  sellingPrice: number
}

type Tone = 'cost' | 'sales' | 'profit' | 'loss' | 'neutral'

function Stat({ label, value, tone, big }: { label: string; value: string; tone: Tone; big?: boolean }) {
  return (
    <motion.div
      className={`stat tone-${tone}${big ? ' stat-big' : ''}`}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
    </motion.div>
  )
}

export default function ResultCards({ result, sellingPrice }: Props) {
  if (!result) {
    return (
      <div className="card empty-results">
        <p className="empty-title">Your results appear here</p>
        <p className="muted">Fill in the form and the per-unit cost, profit and margin update instantly.</p>
      </div>
    )
  }

  const profitTone: Tone = result.totalProfit < 0 ? 'loss' : 'profit'

  return (
    <div className="results">
      <Stat label="Cost per unit" value={formatMoney(result.costPerUnit)} tone="cost" big />
      <Stat label="Selling price" value={formatMoney(sellingPrice)} tone="sales" big />
      <Stat label="Profit per unit" value={formatMoney(result.profitPerUnit)} tone={profitTone} big />
      <Stat label="Total profit" value={formatMoney(result.totalProfit)} tone={profitTone} big />
      <Stat label="Total units" value={formatCount(result.totalUnits)} tone="neutral" />
      <Stat label="Total cost" value={formatMoney(result.totalPurchaseCost)} tone="cost" />
      <Stat label="Total sales" value={formatMoney(result.totalSalesValue)} tone="sales" />
      <Stat label="Margin" value={formatPercent(result.profitMargin)} tone={profitTone} />
    </div>
  )
}
