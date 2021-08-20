const fs = require('fs')
const cuf = require('../../lib/core-util-fs')

test.each([
  [100, true],
  [0, false]
])('core-util-fs/isSameAge/+', (testValue, testResult) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'statSync')
    .mockReturnValue({ mtime: testValue })

  return expect(cuf.isSameAge(localFile, 100)).toBe(testResult)
})
test.each([
  [0, false],
  [100, false]
])('core-util-fs/isSameAge/-', (testValue, testResult) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'statSync')
    .mockReturnValue(undefined)

  return expect(cuf.isSameAge(localFile, 50)).toBe(testResult)
})
