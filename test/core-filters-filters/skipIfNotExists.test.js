const cf0 = require('../../lib/core-filters')
const cuf = require('../../lib/core-util-fs')

const localFile = 'xxxx'

test.each([
  [true, true],
  [false, false]
])('skipIfNotExists', (testValue, testResult) => {
  jest.spyOn(cuf, 'isPathExist').mockImplementation(() => { return testValue })

  expect(cf0.skipIfNotExists(localFile)).toBe(testResult)
})
