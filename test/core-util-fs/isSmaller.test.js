const fs = require('fs')
const cuf = require('../../lib/core-util-fs')

test.each([
  [0, true],
  [100, false]
])('core-util-fs/isSmaller/+', (testValue, testResult) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'statSync')
    .mockReturnValue({ size: testValue })

  return expect(cuf.isSmaller(localFile, 50)).toBe(testResult)
})

test.each([
  [0, false],
  [100, false]
])('core-util-fs/isSmaller/-', (testValue, testResult) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'statSync')
    .mockReturnValue(undefined)

  return expect(cuf.isSmaller(localFile, 50)).toBe(testResult)
})
