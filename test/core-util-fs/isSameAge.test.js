const fs = require('fs')
const cuf = require('../../lib/core-util-fs')

test.each([
  [100, true],
  [0, false]
])('isSameAge', (testValue, testResult) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'statSync').mockImplementation(() => { return { mtime: testValue } })

  return expect(cuf.isSameAge(localFile, 100)).toBe(testResult)
})
