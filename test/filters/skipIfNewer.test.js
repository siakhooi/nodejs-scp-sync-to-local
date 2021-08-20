const cf0 = require('../../filters')
const cuf = require('../../lib/core-util-fs')

const remoteFile = {
  modifyTime: 0
}
const localFile = 'xxxx'

test.each([
  [true, false],
  [false, true]
])('filters/skipIfNewer/+', (testValue, testResult) => {
  jest.spyOn(cuf, 'isNewer')
    .mockReturnValue(testValue)

  return expect(cf0.skipIfNewer(localFile, remoteFile)).toBe(testResult)
})
