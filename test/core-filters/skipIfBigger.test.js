const cf0 = require('../../lib/core-filters')
const cuf = require('../../lib/core-util-fs')

const remoteFile = {
  size: 0
}
const localFile = 'xxxx'

test.each([
  [true, false],
  [false, true]
])('core-filters/skipIfBigger/+', (testValue, testResult) => {
  jest.spyOn(cuf, 'isBigger').mockReturnValue(testValue)

  expect(cf0.skipIfBigger(localFile, remoteFile)).toBe(testResult)
})
