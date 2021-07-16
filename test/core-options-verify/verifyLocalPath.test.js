const util = require('util')
const cov = require('../../lib/core-options-verify')

const DEFAULT_LOCALPATH = '.'

test('verifyLocalPath', () => {
  const workingObject = {
    userOption: { localPath: '/home/testuser/files/' },
    validatedOption: {}
  }

  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: { localPath: '/home/testuser/files/' },
      validatedOption: { localPath: '/home/testuser/files/' }
    })
})

test.each([null, ''])('verifyLocalPath/blank', (value) => {
  const workingObject = {
    userOption: { localPath: value },
    validatedOption: {}
  }

  const warnOutput = []
  global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s) })
  const msg = util.format('Warning: localPath is undefined, defaulting to current directory. [%s]', DEFAULT_LOCALPATH)

  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: { localPath: value },
      validatedOption: { localPath: DEFAULT_LOCALPATH }
    })
  expect(console.warn).toBeCalled()
  expect(warnOutput).toContain(msg)
})
test('verifyLocalPath/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  const warnOutput = []
  global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s) })
  const msg = util.format('Warning: localPath is undefined, defaulting to current directory. [%s]', DEFAULT_LOCALPATH)
  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { localPath: DEFAULT_LOCALPATH }
    })
  expect(console.warn).toBeCalled()
  expect(warnOutput).toContain(msg)
})

test.each([null, ''])('verifyLocalPath/blank/quiet', (value) => {
  const workingObject = {
    userOption: { localPath: value },
    validatedOption: { quiet: true }
  }

  global.console.warn = jest.fn()

  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: { localPath: value },
      validatedOption: {
        localPath: DEFAULT_LOCALPATH,
        quiet: true
      }
    })
  expect(console.warn).not.toBeCalled()
})
test('verifyLocalPath/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }

  global.console.warn = jest.fn()
  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        localPath: DEFAULT_LOCALPATH,
        quiet: true
      }
    })
  expect(console.warn).not.toBeCalled()
})
