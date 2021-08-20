const fs = require('fs')
const cus = require('../../lib/core-util-fs')

test.each([
  true, false
])('core-util-fs/isPathExist/+', (testValue) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'existsSync')
    .mockReturnValue(testValue)

  return expect(cus.isPathExist(localFile)).toBe(testValue)
})
