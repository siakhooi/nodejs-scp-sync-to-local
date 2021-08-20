const cf0 = require('../../filters')
const cuf = require('../../lib/core-util-fs')

const localFile = 'xxxx'

test.each([
  [true, true],
  [false, false]
])('filters/skipIfNotExists/+', (testValue, testResult) => {
  jest.spyOn(cuf, 'isPathExist')
    .mockReturnValue(testValue)

  return expect(cf0.skipIfNotExists(localFile)).toBe(testResult)
})
