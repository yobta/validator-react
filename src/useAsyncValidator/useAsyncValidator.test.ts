import { act, renderHook } from '@testing-library/react'
import { createAsyncValidator, rule } from '@yobta/validator'

import { useAsyncValidator } from './useAsyncValidator.js'

test('return value', () => {
  const validator = createAsyncValidator(rule(() => {}))
  const { result } = renderHook(() => useAsyncValidator(validator))
  const [validate, busy] = result.current

  expect(typeof validate).toBe('function')
  expect(typeof busy).toBe('boolean')
})

test('promise resolve', async () => {
  let resolvePromise: (value: unknown) => void
  const validator = createAsyncValidator(
    rule(
      () =>
        new Promise(resolve => {
          resolvePromise = resolve
        }),
    ),
  )

  const { result } = renderHook(() => useAsyncValidator(validator))
  const [validate] = result.current

  expect(result.current[1]).toBe(false)

  await act(async () => {
    validate({})
  })
  expect(result.current[1]).toBe(true)

  await act(async () => {
    resolvePromise({})
  })
  expect(result.current[1]).toBe(false)
})
