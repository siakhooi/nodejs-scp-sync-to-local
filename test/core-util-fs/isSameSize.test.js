const fs = require('fs')
const cuf = require('../../lib/core-util-fs')

test.each([
  [50, true],
  [100, false]
])('isSameSize', (testValue, testResult) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'statSync').mockImplementation(() => { return { size: testValue } })

  return expect(cuf.isSameSize(localFile, 50)).toBe(testResult)
})
