const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')

const DEFAULT_LOCALPATH = '.'
const expectedWarn = [util.format('Warning: localPath is undefined, defaulting to current directory. [%s]', DEFAULT_LOCALPATH)]

test('verifyLocalPath/text', () => {
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

  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: { localPath: value },
      validatedOption: { localPath: DEFAULT_LOCALPATH }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})
test('verifyLocalPath/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  const w = new m.MockOutput()
  co0.warn = w.fn()
  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { localPath: DEFAULT_LOCALPATH }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each([null, ''])('verifyLocalPath/blank/quiet', (value) => {
  const workingObject = {
    userOption: { localPath: value },
    validatedOption: { quiet: true }
  }

  co0.warn = jest.fn()

  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: { localPath: value },
      validatedOption: {
        localPath: DEFAULT_LOCALPATH,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
test('verifyLocalPath/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }

  co0.warn = jest.fn()
  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        localPath: DEFAULT_LOCALPATH,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
