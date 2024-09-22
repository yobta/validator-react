# @yobta/validator-react

React hooks for [@yobta/validator](https://github.com/yobta/validator)

## Installation

```
npm i @yobta/validator
npm i @yobta/validator-react
```

## Usage

### useAsyncValidator

```ts
import { createAsyncValidator, rule } from '@yobta/validator'
import { useAsyncValidator } from '@yobta/validator-react'

const validator = createAsyncValidator(rule(async value => somePromise(value)))

const [validate, isValidating] = useAsyncValidator(validator)
```
