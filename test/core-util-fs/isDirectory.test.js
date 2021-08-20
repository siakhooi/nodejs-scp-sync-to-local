const fs = require('fs')
const cus = require('../../lib/core-util-fs')

test.each([
  true, false
])('core-util-fs/isDirectory/+', (testValue) => {
  const localFile = 'xxxx'

  jest.mock('fs')
  jest.spyOn(fs, 'lstatSync')
    .mockReturnValue({ isDirectory: function (f) { return testValue } })

  return expect(cus.isDirectory(localFile)).toBe(testValue)
})
