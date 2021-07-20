const cd0 = require('../../lib/core-download')

test('download/outputBegin', () => {
  const fileWorkingObject = {
    fileNum: 1,
    quiet: false,
    remoteFile: './test.txt'
  }

  const logValues = [
    ['1 downloading ./test.txt']
  ]

  const logOutput = []
  global.console.info = jest.fn().mockImplementation((s) => { logOutput.push([s]) })

  cd0.outputBegin(fileWorkingObject)
    .then(() => {
      expect(console.info).toBeCalled()
      logValues.forEach((x) => expect(logOutput).toContainEqual(x))
      logOutput.forEach((x) => expect(logValues).toContainEqual(x))
    })
})

test('download/outputBegin/quiet', () => {
  const fileWorkingObject = {
    fileNum: 1,
    quiet: true,
    remoteFile: './test.txt'
  }

  global.console.info = jest.fn()

  cd0.outputBegin(fileWorkingObject)
    .then(() => {
      expect(console.info).not.toBeCalled()
    })
})
