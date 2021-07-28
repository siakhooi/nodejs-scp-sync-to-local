const cou = require('../../lib/core-output')
const util = require('util')

test('core-output/print/1', () => {
  const actualPrint = []
  process.stdout.write = jest.fn().mockImplementation((...v) => { actualPrint.push(util.format(...v)) })
  const expectedPrint = ['Hello World']

  cou.print('Hello World')

  expect(process.stdout.write).toBeCalled()
  actualPrint.forEach((x) => expect(expectedPrint).toContainEqual(x))
  expectedPrint.forEach((x) => expect(actualPrint).toContainEqual(x))
})

test.each([
  ['Hello World', 'Hello You', 'Hello World Hello You'],
  ['Hello %s World', 'Hello You', 'Hello Hello You World']
])('core-output/print/2', (v1, v2, r1) => {
  const actualPrint = []
  process.stdout.write = jest.fn().mockImplementation((...v) => { actualPrint.push(util.format(...v)) })
  const expectedPrint = [r1]

  cou.print(v1, v2)

  expect(process.stdout.write).toBeCalled()
  actualPrint.forEach((x) => expect(expectedPrint).toContainEqual(x))
  expectedPrint.forEach((x) => expect(actualPrint).toContainEqual(x))
})

test.each([
  ['Hello World', 'Hello You', 'Hello Him', 'Hello World Hello You Hello Him'],
  ['Hello %s %s World', 'Hello You', 'Hello Him', 'Hello Hello You Hello Him World']
])('core-output/print/3', (v1, v2, v3, r1) => {
  const actualPrint = []
  process.stdout.write = jest.fn().mockImplementation((...v) => { actualPrint.push(util.format(...v)) })
  const expectedPrint = [r1]

  cou.print(v1, v2, v3)

  expect(process.stdout.write).toBeCalled()
  actualPrint.forEach((x) => expect(expectedPrint).toContainEqual(x))
  expectedPrint.forEach((x) => expect(actualPrint).toContainEqual(x))
})
