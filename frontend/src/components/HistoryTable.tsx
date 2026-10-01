import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { SavedCalculation } from '../types'
import { formatDate, formatMoney, formatPercent } from '../utils/format'

interface Props {
  items: SavedCalculation[]
  loading: boolean
  loadError: string | null
  onView: (item: SavedCalculation) => void
  onDelete: (id: number) => void
  onRetry: () => void
}

export default function HistoryTable({ items, loading, loadError, onView, onDelete, onRetry }: Props) {
  const [search, setSearch] = useState('')
  const query = search.trim().toLowerCase()
  const visible = items.filter((item) => item.productName.toLowerCase().includes(query))

  return (
    <section className="card history" aria-labelledby="history-title">
      <div className="history-head">
        <h2 id="history-title">Saved calculations</h2>
        <input
          className="input search"
          type="search"
          placeholder="Search products"
          aria-label="Search saved calculations"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="muted state">Loading…</p>}
      {loadError && (
        <p className="state error-text" role="alert">
          {loadError}{' '}
          <button className="link-btn" onClick={onRetry}>
            Try again
          </button>
        </p>
      )}
      {!loading && !loadError && items.length === 0 && (
        <p className="muted state">Nothing saved yet. Your saved calculations will show up here.</p>
      )}
      {!loading && !loadError && items.length > 0 && visible.length === 0 && (
        <p className="muted state">No products match “{search}”.</p>
      )}

      {visible.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Package</th>
                <th className="num">Cost / unit</th>
                <th className="num">Selling</th>
                <th className="num">Profit / unit</th>
                <th className="num">Total profit</th>
                <th className="num">Margin</th>
                <th>Date</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {visible.map((item) => (
                  <motion.tr
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="strong">{item.productName}</td>
                    <td>
                      {item.packageCount} × {item.packageType}
                    </td>
                    <td className="num">{formatMoney(item.costPerUnit)}</td>
                    <td className="num">{formatMoney(item.sellingPricePerUnit)}</td>
                    <td className={item.profitPerUnit < 0 ? 'num loss' : 'num profit'}>{formatMoney(item.profitPerUnit)}</td>
                    <td className={item.totalProfit < 0 ? 'num loss' : 'num profit'}>{formatMoney(item.totalProfit)}</td>
                    <td className="num">{formatPercent(item.profitMargin)}</td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td className="row-actions">
                      <button className="link-btn" onClick={() => onView(item)}>
                        View
                      </button>
                      <button className="link-btn danger" onClick={() => onDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
