const cf0 = require('../../filters')
const cuf = require('../../lib/core-util-fs')

const remoteFile = {
  size: 0
}
const localFile = 'xxxx'

test.each([
  [true, false],
  [false, true]
])('filters/skipIfBigger/+', (testValue, testResult) => {
  jest.spyOn(cuf, 'isBigger')
    .mockReturnValue(testValue)

  return expect(cf0.skipIfBigger(localFile, remoteFile)).toBe(testResult)
})
