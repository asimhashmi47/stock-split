import { motion } from 'framer-motion'
import { CUSTOM, PACKAGE_TYPES, type FormErrors, type FormValues } from '../utils/validate'

interface Props {
  values: FormValues
  errors: FormErrors
  saving: boolean
  onChange: (values: FormValues) => void
  onSave: () => void
  onReset: () => void
}

interface FieldProps {
  label: string
  name: keyof FormValues
  placeholder: string
  values: FormValues
  errors: FormErrors
  onChange: (values: FormValues) => void
  numeric?: boolean
  span?: boolean
}

function Field({ label, name, placeholder, values, errors, onChange, numeric, span }: FieldProps) {
  const error = errors[name]
  return (
    <label className={span ? 'field span-2' : 'field'}>
      <span className="field-label">{label}</span>
      <input
        className={error ? 'input invalid' : 'input'}
        type={numeric ? 'number' : 'text'}
        inputMode={numeric ? 'decimal' : undefined}
        min={numeric ? 0 : undefined}
        step={numeric ? 'any' : undefined}
        maxLength={numeric ? undefined : 100}
        placeholder={placeholder}
        value={values[name]}
        aria-invalid={Boolean(error)}
        onChange={(e) => onChange({ ...values, [name]: e.target.value })}
      />
      {error && (
        <motion.span className="field-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
          {error}
        </motion.span>
      )}
    </label>
  )
}

export default function CalculatorForm({ values, errors, saving, onChange, onSave, onReset }: Props) {
  const shared = { values, errors, onChange }
  return (
    <form
      className="card form-grid"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onSave()
      }}
    >
      <Field label="Product name" name="productName" placeholder="Coca Cola 1.5L" span {...shared} />
      <label className="field">
        <span className="field-label">Package type</span>
        <select
          className="input"
          value={values.packageType}
          onChange={(e) => onChange({ ...values, packageType: e.target.value })}
        >
          {[...PACKAGE_TYPES, CUSTOM].map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>

      <Field label="Number of packages" name="packageCount" placeholder="5" numeric {...shared} />
      {values.packageType === CUSTOM && (
        <Field label="Custom package name" name="customPackageType" placeholder="Crate" span {...shared} />
      )}

      <Field label="Units per package" name="unitsPerPackage" placeholder="24" numeric {...shared} />
      <Field label="Purchase price per package" name="purchasePricePerPackage" placeholder="1800" numeric {...shared} />
      <Field label="Selling price per unit" name="sellingPricePerUnit" placeholder="90" numeric {...shared} />

      <div className="actions span-2">
        <motion.button
          type="submit"
          className="btn btn-primary"
          disabled={saving}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          {saving ? 'Saving…' : 'Save calculation'}
        </motion.button>
        <motion.button type="button" className="btn btn-ghost" onClick={onReset} whileTap={{ scale: 0.97 }}>
          Clear
        </motion.button>
      </div>
    </form>
  )
}
