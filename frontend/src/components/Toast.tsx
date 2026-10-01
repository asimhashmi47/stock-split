import { AnimatePresence, motion } from 'framer-motion'

export interface ToastMessage {
  id: number
  text: string
  kind: 'success' | 'error'
}

export default function Toast({ toast }: { toast: ToastMessage | null }) {
  return (
    <div className="toast-region" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className={`toast toast-${toast.kind}`}
            role={toast.kind === 'error' ? 'alert' : 'status'}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
