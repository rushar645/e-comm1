"use client"

import { useState, useCallback } from "react"

interface UseFormSubmitOptions<T> {
  onSubmit: (data: T) => Promise<unknown>
  onSuccess?: (result: unknown) => void
  onError?: (error: Error) => void
}

export function useFormSubmit<T>({ onSubmit, onSuccess, onError }: UseFormSubmitOptions<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [success, setSuccess] = useState<unknown | null>(null)

  const handleSubmit = useCallback(
    async (data: T) => {
      setIsSubmitting(true)
      setError(null)
      setSuccess(null)

      try {
        const result = await onSubmit(data)
        setSuccess(result)
        onSuccess?.(result)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        onError?.(error)
        throw error
      } finally {
        setIsSubmitting(false)
      }
    },
    [onSubmit, onSuccess, onError],
  )

  const reset = useCallback(() => {
    setError(null)
    setSuccess(null)
  }, [])

  return {
    isSubmitting,
    error,
    success,
    handleSubmit,
    reset,
  }
}
