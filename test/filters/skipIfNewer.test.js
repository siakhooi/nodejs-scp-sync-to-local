const cf0 = require('../../filters')
const cuf = require('../../lib/core-util-fs')

const remoteFile = {
  modifyTime: 0
}
const localFile = 'xxxx'

test.each([
  [true, false],
  [false, true]
])('skipIfNewer', (testValue, testResult) => {
  jest.spyOn(cuf, 'isNewer').mockImplementation(() => { return testValue })

  return expect(cf0.skipIfNewer(localFile, remoteFile)).toBe(testResult)
})
