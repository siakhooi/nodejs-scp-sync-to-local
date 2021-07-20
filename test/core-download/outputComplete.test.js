const cd0 = require('../../lib/core-download')

test('download/outputComplete', () => {
  const fileWorkingObject = {
    fileNum: 1,
    fileSize: 1000,
    quiet: false,
    localFile: './test.txt',
    remoteFile: './test.txt'
  }

  const logValues = [
    ['1 downloaded ./test.txt ./test.txt 1000']
  ]

  const logOutput = []
  global.console.info = jest.fn().mockImplementation((s) => { logOutput.push([s]) })

  cd0.outputComplete(fileWorkingObject)
    .then(() => {
      expect(console.info).toBeCalled()
      logValues.forEach((x) => expect(logOutput).toContainEqual(x))
      logOutput.forEach((x) => expect(logValues).toContainEqual(x))
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

  global.console.info = jest.fn()

  cd0.outputComplete(fileWorkingObject)
    .then(() => {
      expect(console.info).not.toBeCalled()
    })
})
