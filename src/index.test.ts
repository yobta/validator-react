import * as index from './index.js'

test('exports', () => {
  const keys = Object.keys(index)
  expect(keys).toEqual(['useAsyncValidator'])
})
