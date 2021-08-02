const fs = require('fs')
const cuf = require('../../lib/core-util-fs')

test.each([
  [100, true],
  [0, false]
])('isNewer/ok', (testValue, testResult) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'statSync').mockImplementation(() => { return { mtime: testValue } })

  return expect(cuf.isNewer(localFile, 50)).toBe(testResult)
})
test.each([
  [0, false],
  [100, false]
])('isNewer/Error', (testValue, testResult) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'statSync').mockImplementation(() => { return undefined })

  return expect(cuf.isNewer(localFile, 50)).toBe(testResult)
})
