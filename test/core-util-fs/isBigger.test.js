const fs = require('fs')
const cuf = require('../../lib/core-util-fs')

test.each([
  [100, true],
  [0, false]
])('isBigger/ok', (testValue, testResult) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'statSync').mockImplementation(() => { return { size: testValue } })

  return expect(cuf.isBigger(localFile, 50)).toBe(testResult)
})
test.each([
  [0, false],
  [100, false]
])('isBigger/Error', (testValue, testResult) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'statSync').mockImplementation(() => { return undefined })

  return expect(cuf.isBigger(localFile, 50)).toBe(testResult)
})
