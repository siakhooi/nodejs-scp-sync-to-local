const fs = require('fs')
const cus = require('../../lib/core-util-fs')

test.each([
  true, false
])('isPathExist', (testValue) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'existsSync').mockImplementation(() => { return testValue })

  return expect(cus.isPathExist(localFile)).toBe(testValue)
})
