const cf0 = require('../../filters')
const cuf = require('../../lib/core-util-fs')

const remoteFile = {
  size: 0
}
const localFile = 'xxxx'

test.each([
  [true, false],
  [false, true]
])('skipIfSmaller', (testValue, testResult) => {
  jest.spyOn(cuf, 'isSmaller').mockImplementation(() => { return testValue })

  return expect(cf0.skipIfSmaller(localFile, remoteFile)).toBe(testResult)
})
