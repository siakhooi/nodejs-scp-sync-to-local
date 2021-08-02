const fs = require('fs')
const cuf = require('../../lib/core-util-fs')

test('mkdir', () => {
  const filename = 'xxxx'

  fs.mkdirSync = jest.fn()

  return expect(cuf.mkdir(filename)).toBeUndefined()
})
