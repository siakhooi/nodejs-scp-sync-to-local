const cf0 = require('../../filters')
const cuf = require('../../lib/core-util-fs')

const remoteFile = {
  modifyTime: 0
}

const localFile = 'xxxx'

test.each([
  [true, false],
  [false, true]
])('skipIfSameAge', (testValue, testResult) => {
  jest.spyOn(cuf, 'isSameAge').mockImplementation(() => { return testValue })

  return expect(cf0.skipIfSameAge(localFile, remoteFile)).toBe(testResult)
})
