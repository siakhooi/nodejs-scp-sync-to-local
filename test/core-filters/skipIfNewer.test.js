const cf0 = require('../../lib/core-filters')
const cuf = require('../../lib/core-util-fs')

const remoteFile = {
  modifyTime: 0
}
const localFile = 'xxxx'

test.each([
  [true, false],
  [false, true]
])('core-filters/skipIfNewer/+', (testValue, testResult) => {
  jest.spyOn(cuf, 'isNewer').mockReturnValue(testValue)

  expect(cf0.skipIfNewer(localFile, remoteFile)).toBe(testResult)
})
