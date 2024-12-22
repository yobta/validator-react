import type {
  YobtaAsyncValidator,
  YobtaAsyncValidatorResult,
} from '@yobta/validator/lib/_types/YobtaAsyncValidator'
import type { DependencyList } from 'react'
import { useCallback, useState } from 'react'

type Validator<Data> = (event: unknown) => YobtaAsyncValidatorResult<Data>

/**
 * useAsyncValidator is a React hook that provides an asynchronous validation function along with its loading state.
 *
 * @template Data - The type of data returned by the validator.
 * @param {YobtaAsyncValidator<unknown, Data>} validator - The asynchronous validator function.
 * @param {(...result: Awaited<YobtaAsyncValidatorResult<Data>>) => void | Promise<void>} callback - The callback function to be called with the result of the validation.
 * @param {DependencyList} [deps=[validator]] - The dependency list for the validator function.
 * @returns {[Validator<Data>, boolean]} A tuple containing the validate function and a boolean indicating if validation is in progress.
 */
export const useAsyncValidator = <Data>(
  validator: YobtaAsyncValidator<unknown, Data>,
  callback: (
    ...result: Awaited<YobtaAsyncValidatorResult<Data>>
  ) => Promise<void> | void,
  deps: DependencyList = [validator],
): [Validator<Data>, boolean] => {
  const [busy, setBusy] = useState(false)

  const validate: Validator<Data> = useCallback(async (event: unknown) => {
    setBusy(true)
    let result: Awaited<YobtaAsyncValidatorResult<Data>>
    try {
      result = await validator(event)
      await callback(...result)
      return result
    } finally {
      setBusy(false)
    }
  }, deps)

  return [validate, busy] as const
}
