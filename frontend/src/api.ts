import type { CalculationInput, SavedCalculation } from './types'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5146'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${BASE_URL}/api/calculations${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    throw new Error('Cannot reach the server. Please check it is running.')
  }
  if (!response.ok) {
    throw new Error(
      response.status === 400 ? 'Some values were rejected. Please check the form.' : 'Something went wrong. Please try again.',
    )
  }
  return response.status === 204 ? (undefined as T) : response.json()
}

export const getCalculations = () => request<SavedCalculation[]>('')

export const saveCalculation = (input: CalculationInput) =>
  request<SavedCalculation>('', { method: 'POST', body: JSON.stringify(input) })

export const deleteCalculation = (id: number) => request<void>(`/${id}`, { method: 'DELETE' })
