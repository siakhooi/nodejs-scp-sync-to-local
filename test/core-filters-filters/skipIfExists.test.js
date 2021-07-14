const cf0 = require('../../lib/core-filters')
const cuf = require('../../lib/core-util-fs')

const localFile = 'xxxx'

test.each([
  [true, false],
  [false, true]
])('skipIfExists', (testValue, testResult) => {
  jest.spyOn(cuf, 'isPathExist').mockImplementation(() => { return testValue })

  expect(cf0.skipIfExists(localFile)).toBe(testResult)
})
