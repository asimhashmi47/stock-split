import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { deleteCalculation, getCalculations, saveCalculation } from './api'
import CalculatorForm from './components/CalculatorForm'
import HistoryTable from './components/HistoryTable'
import ResultCards from './components/ResultCards'
import Toast, { type ToastMessage } from './components/Toast'
import type { SavedCalculation } from './types'
import { calculate } from './utils/calculate'
import { emptyForm, toFormValues, validate, type FormValues } from './utils/validate'

export default function App() {
  const [values, setValues] = useState<FormValues>(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [history, setHistory] = useState<SavedCalculation[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const toastTimer = useRef<number>(undefined)

  const { input, errors } = useMemo(() => validate(values), [values])
  const result = useMemo(() => (input ? calculate(input) : null), [input])

  const showToast = useCallback((text: string, kind: ToastMessage['kind']) => {
    window.clearTimeout(toastTimer.current)
    setToast({ id: Date.now(), text, kind })
    toastTimer.current = window.setTimeout(() => setToast(null), 3500)
  }, [])

  const loadHistory = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      setHistory(await getCalculations())
    } catch (error) {
      setLoadError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadHistory()
  }, [loadHistory])

  async function handleSave() {
    setSubmitted(true)
    if (!input) return
    setSaving(true)
    try {
      const saved = await saveCalculation(input)
      setHistory((current) => [saved, ...current])
      showToast('Calculation saved', 'success')
    } catch (error) {
      showToast((error as Error).message, 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteCalculation(id)
      setHistory((current) => current.filter((item) => item.id !== id))
      showToast('Calculation deleted', 'success')
    } catch (error) {
      showToast((error as Error).message, 'error')
    }
  }

  function handleView(item: SavedCalculation) {
    setValues(toFormValues(item))
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleReset() {
    setValues(emptyForm)
    setSubmitted(false)
  }

  return (
    <div className="page">
      <header className="header">
        <div className="logo" aria-hidden="true">
          S
        </div>
        <div>
          <h1>StockSplit</h1>
          <p className="muted">Turn package prices into simple per-unit costs.</p>
        </div>
      </header>

      <motion.main
        className="calculator"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <CalculatorForm
          values={values}
          errors={submitted ? errors : {}}
          saving={saving}
          onChange={setValues}
          onSave={handleSave}
          onReset={handleReset}
        />
        <ResultCards result={result} sellingPrice={input?.sellingPricePerUnit ?? 0} />
      </motion.main>

      <HistoryTable
        items={history}
        loading={loading}
        loadError={loadError}
        onView={handleView}
        onDelete={handleDelete}
        onRetry={loadHistory}
      />
      <Toast toast={toast} />
    </div>
  )
}
