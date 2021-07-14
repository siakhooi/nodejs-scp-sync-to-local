const cf0 = require('../../filters')
const cuf = require('../../lib/core-util-fs')

const remoteFile = {
  size: 0
}
const localFile = 'xxxx'

test.each([
  [true, false],
  [false, true]
])('skipIfSameSize', (testValue, testResult) => {
  jest.spyOn(cuf, 'isSameSize').mockImplementation(() => { return testValue })

  return expect(cf0.skipIfSameSize(localFile, remoteFile)).toBe(testResult)
})
