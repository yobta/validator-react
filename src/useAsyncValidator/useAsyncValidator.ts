import type {
  YobtaAsyncValidator,
  YobtaAsyncValidatorResult,
} from '@yobta/validator/lib/_types/YobtaAsyncValidator'
import { useCallback, useState } from 'react'

type HookValidator<Data> = (event: unknown) => YobtaAsyncValidatorResult<Data>

export const useAsyncValidator = <Data>(
  validator: YobtaAsyncValidator<unknown, Data>,
): [HookValidator<Data>, boolean] => {
  const [busy, setBusy] = useState(false)

  const validate: HookValidator<Data> = useCallback(
    async (event: unknown) => {
      setBusy(true)
      try {
        return await validator(event)
      } finally {
        setBusy(false)
      }
    },
    [validator],
  )

  return [validate, busy] as const
}
