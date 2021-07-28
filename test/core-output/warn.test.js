const co0 = require('../../lib/core-output')
const util = require('util')

test('core-output/warn/1', () => {
  const actualWarn = []
  console.warn = jest.fn().mockImplementation((...v) => { actualWarn.push(...v) })
  const expectedWarn = ['Hello World']

  co0.warn('Hello World')

  expect(console.warn).toBeCalled()
  actualWarn.forEach((x) => expect(expectedWarn).toContainEqual(x))
  expectedWarn.forEach((x) => expect(actualWarn).toContainEqual(x))
})

test.each([
  ['Hello World', 'Hello You', 'Hello World Hello You'],
  ['Hello %s World', 'Hello You', 'Hello Hello You World']
])('core-output/warn/2', (v1, v2, r1) => {
  const actualWarn = []
  console.warn = jest.fn().mockImplementation((...v) => { actualWarn.push(util.format(...v)) })
  const expectedWarn = [r1]

  co0.warn(v1, v2)

  expect(console.warn).toBeCalled()
  actualWarn.forEach((x) => expect(expectedWarn).toContainEqual(x))
  expectedWarn.forEach((x) => expect(actualWarn).toContainEqual(x))
})

test.each([
  ['Hello World', 'Hello You', 'Hello Him', 'Hello World Hello You Hello Him'],
  ['Hello %s %s World', 'Hello You', 'Hello Him', 'Hello Hello You Hello Him World']
])('core-output/warn/3', (v1, v2, v3, r1) => {
  const actualWarn = []
  console.warn = jest.fn().mockImplementation((...v) => { actualWarn.push(util.format(...v)) })
  const expectedWarn = [r1]

  co0.warn(v1, v2, v3)

  expect(console.warn).toBeCalled()
  actualWarn.forEach((x) => expect(expectedWarn).toContainEqual(x))
  expectedWarn.forEach((x) => expect(actualWarn).toContainEqual(x))
})
