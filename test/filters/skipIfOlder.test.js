const cf0 = require('../../filters')
const cuf = require('../../lib/core-util-fs')

const remoteFile = {
  modifyTime: 0
}
const localFile = 'xxxx'

test.each([
  [true, false],
  [false, true]
])('filters/skipIfOlder/+', (testValue, testResult) => {
  jest.spyOn(cuf, 'isOlder')
    .mockReturnValue(testValue)

  return expect(cf0.skipIfOlder(localFile, remoteFile)).toBe(testResult)
})
