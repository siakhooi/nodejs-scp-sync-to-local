const cf0 = require('../../filters')
const cuf = require('../../lib/core-util-fs')

const remoteFile = {
  modifyTime: 0
}

const localFile = 'xxxx'

test.each([
  [true, false],
  [false, true]
])('filters/skipIfSameAge/+', (testValue, testResult) => {
  jest.spyOn(cuf, 'isSameAge')
    .mockReturnValue(testValue)

  return expect(cf0.skipIfSameAge(localFile, remoteFile)).toBe(testResult)
})
