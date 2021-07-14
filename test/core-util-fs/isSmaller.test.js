const fs = require('fs')
const cuf = require('../../lib/core-util-fs')

test.each([
  [0, true],
  [100, false]
])('isSmaller', (testValue, testResult) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'statSync').mockImplementation(() => { return { size: testValue } })

  return expect(cuf.isSmaller(localFile, 50)).toBe(testResult)
})
