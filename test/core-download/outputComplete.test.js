const cd0 = require('../../lib/core-download')
const cou = require('../../lib/core-output')
const m = require('../mocklib')

test('download/outputComplete/1', () => {
  const fileWorkingObject = {
    fileNum: 1,
    fileSize: 1000,
    quiet: false,
    localFile: './test.txt',
    remoteFile: './test.txt'
  }

  const expectedInfo = [
    '1 downloaded ./test.txt ./test.txt 1000'
  ]

  const i = new m.MockOutput()
  cou.info = i.fn()

  cd0.outputComplete(fileWorkingObject)
    .then(() => {
      expect(i.verify(expectedInfo)).resolves.toBe(true)
    })
})

test('download/outputComplete/quiet', () => {
  const fileWorkingObject = {
    fileNum: 1,
    fileSize: 1000,
    quiet: true,
    localFile: './test.txt',
    remoteFile: './test.txt'
  }

  cou.info = jest.fn()

  cd0.outputComplete(fileWorkingObject)
    .then(() => {
      expect(cou.info).not.toBeCalled()
    })
})
