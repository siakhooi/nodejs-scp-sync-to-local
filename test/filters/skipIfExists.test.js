const cf0 = require('../../filters')
const cuf = require('../../lib/core-util-fs')

const localFile = 'xxxx'

test.each([
  [true, false],
  [false, true]
])('filters/skipIfExists/+', (testValue, testResult) => {
  jest.spyOn(cuf, 'isPathExist')
    .mockReturnValue(testValue)

  return expect(cf0.skipIfExists(localFile)).toBe(testResult)
})
