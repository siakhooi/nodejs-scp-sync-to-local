const cd0 = require('../../lib/core-download')
const cuf = require('../../lib/core-util-fs')

test('core-download/keepTimestamp/+', () => {
  const fileWorkingObject = {
    keepTimestamp: true,
    accessTime: 1622867586000,
    modifyTime: 1623577546000,
    localFile: './test.txt'
  }
  cuf.updateTimes = jest.fn()
  cd0.keepTimestamp(fileWorkingObject)
    .then(() => {
      expect(cuf.updateTimes).toBeCalled()
    })
})
test('core-download/keepTimestamp/-', () => {
  const fileWorkingObject = {
    keepTimestamp: false,
    accessTime: 1622867586000,
    modifyTime: 1623577546000,
    localFile: './test.txt'
  }
  cuf.updateTimes = jest.fn()
  cd0.keepTimestamp(fileWorkingObject)
    .then(() => {
      expect(cuf.updateTimes).not.toBeCalled()
    })
})
