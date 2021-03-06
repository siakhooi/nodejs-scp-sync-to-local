const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_LOCALPATH = '.'
const expectedWarn = [util.format('Warning: localPath is undefined, defaulting to current directory. [%s]', DEFAULT_LOCALPATH)]

test('core-options-verify/verifyLocalPath/+', () => {
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

test.each(dt.BlankValueDataSet)('core-options-verify/verifyLocalPath/BlankValueDataSet', (value) => {
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
test('core-options-verify/verifyLocalPath/undefined', () => {
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

test.each(dt.BlankValueDataSet)('core-options-verify/verifyLocalPath/BlankValueDataSet/quiet', (value) => {
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
test('core-options-verify/verifyLocalPath/undefined/quiet', () => {
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

test.each(dt.BlankValueDataSet)('core-options-verify/verifyLocalPath/BlankValueDataSet/prompt', (value) => {
  const workingObject = {
    userOption: { prompt: true, localPath: value },
    validatedOption: { prompt: true }
  }

  const expectWorkingObject = {
    userOption: { prompt: true, localPath: value },
    validatedOption: { prompt: true, localPath: null }
  }

  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toEqual(expectWorkingObject)
})
test('core-options-verify/verifyLocalPath/undefined/prompt', () => {
  const workingObject = {
    userOption: { prompt: true },
    validatedOption: { prompt: true }
  }

  const expectWorkingObject = {
    userOption: { prompt: true },
    validatedOption: { prompt: true, localPath: null }
  }

  expect(cov.verifyLocalPath(workingObject))
    .resolves
    .toEqual(expectWorkingObject)
})
