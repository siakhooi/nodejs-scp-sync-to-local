const cd0 = require('../../lib/core-download')
const cou = require('../../lib/core-output')
const m = require('../mocklib')

test('core-download/outputBegin/+', () => {
  const fileWorkingObject = {
    fileNum: 1,
    quiet: false,
    remoteFile: './test.txt'
  }

  const expectedInfo = [
    '1 downloading ./test.txt'
  ]

  const i = new m.MockOutput()
  cou.info = i.fn()

  cd0.outputBegin(fileWorkingObject)
    .then(() => {
      expect(i.verify(expectedInfo)).resolves.toBe(true)
    })
})

test('core-download/outputBegin/quiet', () => {
  const fileWorkingObject = {
    fileNum: 1,
    quiet: true,
    remoteFile: './test.txt'
  }

  cou.info = jest.fn()

  cd0.outputBegin(fileWorkingObject)
    .then(() => {
      expect(cou.info).not.toBeCalled()
    })
})
