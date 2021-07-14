const cf0 = require('../../lib/core-filters')
const cuf = require('../../lib/core-util-fs')

const remoteFile = {
  modifyTime: 0
}
const localFile = 'xxxx'

test.each([
  [true, false],
  [false, true]
])('skipIfOlder', (testValue, testResult) => {
  jest.spyOn(cuf, 'isOlder').mockImplementation(() => { return testValue })

  expect(cf0.skipIfOlder(localFile, remoteFile)).toBe(testResult)
})
