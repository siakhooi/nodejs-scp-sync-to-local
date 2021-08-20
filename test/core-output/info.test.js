const cou = require('../../lib/core-output')
const util = require('util')

test('core-output/info/Arg-1', () => {
  const actualInfo = []
  console.info = jest.fn().mockImplementation((...v) => { actualInfo.push(...v) })
  const expectedInfo = ['Hello World']

  cou.info('Hello World')

  expect(console.info).toBeCalled()
  actualInfo.forEach((x) => expect(expectedInfo).toContainEqual(x))
  expectedInfo.forEach((x) => expect(actualInfo).toContainEqual(x))
})

test.each([
  ['Hello World', 'Hello You', 'Hello World Hello You'],
  ['Hello %s World', 'Hello You', 'Hello Hello You World']
])('core-output/info/Arg-2', (v1, v2, r1) => {
  const actualInfo = []
  console.info = jest.fn().mockImplementation((...v) => { actualInfo.push(util.format(...v)) })
  const expectedInfo = [r1]

  cou.info(v1, v2)

  expect(console.info).toBeCalled()
  actualInfo.forEach((x) => expect(expectedInfo).toContainEqual(x))
  expectedInfo.forEach((x) => expect(actualInfo).toContainEqual(x))
})

test.each([
  ['Hello World', 'Hello You', 'Hello Him', 'Hello World Hello You Hello Him'],
  ['Hello %s %s World', 'Hello You', 'Hello Him', 'Hello Hello You Hello Him World']
])('core-output/info/Arg-3', (v1, v2, v3, r1) => {
  const actualInfo = []
  console.info = jest.fn().mockImplementation((...v) => { actualInfo.push(util.format(...v)) })
  const expectedInfo = [r1]

  cou.info(v1, v2, v3)

  expect(console.info).toBeCalled()
  actualInfo.forEach((x) => expect(expectedInfo).toContainEqual(x))
  expectedInfo.forEach((x) => expect(actualInfo).toContainEqual(x))
})
