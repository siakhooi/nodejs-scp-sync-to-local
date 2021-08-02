const fs = require('fs')
const cuf = require('../../lib/core-util-fs')

test('updateTimes', () => {
  const filename = 'xxxx'
  const atimeMs = 1623577546000
  const mtimeMs = 1622867586000

  fs.utimesSync = jest.fn()

  return expect(cuf.updateTimes(filename, atimeMs, mtimeMs)).toBeUndefined()
})
