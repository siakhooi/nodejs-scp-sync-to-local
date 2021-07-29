const cou = require('../../lib/core-output')

test('core-output/getError/1', () => {
  const expectedError = new Error('Hello World')

  expect(cou.getError('Hello World')).toStrictEqual(expectedError)
})

test.each([
  ['Hello World', 'Hello You', 'Hello World Hello You'],
  ['Hello %s World', 'Hello You', 'Hello Hello You World']
])('core-output/getError/2', (v1, v2, r1) => {
  const expectedError = new Error(r1)

  expect(cou.getError(v1, v2)).toStrictEqual(expectedError)
})

test.each([
  ['Hello World', 'Hello You', 'Hello Him', 'Hello World Hello You Hello Him'],
  ['Hello %s %s World', 'Hello You', 'Hello Him', 'Hello Hello You Hello Him World']
])('core-output/getError/3', (v1, v2, v3, r1) => {
  const expectedError = new Error(r1)

  expect(cou.getError(v1, v2, v3)).toStrictEqual(expectedError)
})
