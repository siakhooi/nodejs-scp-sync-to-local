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

test('verifyLocalPath/blank', () => {
  const workingObject = {
    userOption: { localPath: '' },
    validatedOption: {}
  }

  const warnOutput = []
  global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s) })
  const msg = util.format('Warning: localPath undefined, defaulting to current directory. [%s]', DEFAULT_LOCALPATH)

  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: { localPath: '' },
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
  const msg = util.format('Warning: localPath undefined, defaulting to current directory. [%s]', DEFAULT_LOCALPATH)
  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { localPath: DEFAULT_LOCALPATH }
    })
  expect(console.warn).toBeCalled()
  expect(warnOutput).toContain(msg)
})

test('verifyLocalPath/blank/quiet', () => {
  const workingObject = {
    userOption: { localPath: '' },
    validatedOption: { quiet: true }
  }

  global.console.warn = jest.fn()

  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: { localPath: '' },
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
