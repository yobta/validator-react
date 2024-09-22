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
```

#### Basic Usage

By default, the hook caches the validate function based on the validator provided. This means that unless the validator changes, the same validate function instance is used, optimizing performance by preventing unnecessary re-creations.

```ts
const [validate, isValidating] = useAsyncValidator(validator)
```

#### Cache Control with Dependencies

By providing a dependency list, you can control when the validate function is recreated. This is useful for optimizing performance and ensuring that the validator only updates when specific dependencies change.

```ts
const [validate, isValidating] = useAsyncValidator(validator, [dep1, dep2])
```
