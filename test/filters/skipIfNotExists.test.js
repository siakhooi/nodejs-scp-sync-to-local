const cf0 = require('../../filters')
const cuf = require('../../lib/core-util-fs')

const localFile = 'xxxx'

test.each([
  [true, true],
  [false, false]
])('skipIfNotExists', (testValue, testResult) => {
  jest.spyOn(cuf, 'isPathExist').mockImplementation(() => { return testValue })

  return expect(cf0.skipIfNotExists(localFile)).toBe(testResult)
})
