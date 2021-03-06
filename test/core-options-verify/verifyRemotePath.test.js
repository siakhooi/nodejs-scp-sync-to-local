const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_REMOTEPATH = '.'
const expectedWarn = [util.format('Warning: remotePath is undefined, defaulting to current directory. [%s]', DEFAULT_REMOTEPATH)]

test('core-options-verify/verifyRemotePath/+', () => {
  const workingObject = {
    userOption: { remotePath: '/home/testuser/files/' },
    validatedOption: {}
  }

  expect(cov.verifyRemotePath(workingObject))
    .resolves
    .toMatchObject({
      userOption: { remotePath: '/home/testuser/files/' },
      validatedOption: { remotePath: '/home/testuser/files/' }
    })
})

test.each(dt.BlankValueDataSet)('core-options-verify/verifyRemotePath/BlankValueDataSet', (value) => {
  const workingObject = {
    userOption: { remotePath: value },
    validatedOption: {}
  }

  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifyRemotePath(workingObject))
    .resolves
    .toMatchObject({
      userOption: { remotePath: value },
      validatedOption: { remotePath: DEFAULT_REMOTEPATH }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})
test('core-options-verify/verifyRemotePath/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  const w = new m.MockOutput()
  co0.warn = w.fn()
  expect(cov.verifyRemotePath(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { remotePath: DEFAULT_REMOTEPATH }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each(dt.BlankValueDataSet)('core-options-verify/verifyRemotePath/BlankValueDataSet/quiet', (value) => {
  const workingObject = {
    userOption: { remotePath: value },
    validatedOption: { quiet: true }
  }

  co0.warn = jest.fn()

  expect(cov.verifyRemotePath(workingObject))
    .resolves
    .toMatchObject({
      userOption: { remotePath: value },
      validatedOption: {
        remotePath: DEFAULT_REMOTEPATH,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
test('core-options-verify/verifyRemotePath/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }

  co0.warn = jest.fn()
  expect(cov.verifyRemotePath(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        remotePath: DEFAULT_REMOTEPATH,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})

test.each(dt.BlankValueDataSet)('core-options-verify/verifyRemotePath/BlankValueDataSet/prompt', (value) => {
  const workingObject = {
    userOption: { prompt: true, remotePath: value },
    validatedOption: { prompt: true }
  }

  const expectWorkingObject = {
    userOption: { prompt: true, remotePath: value },
    validatedOption: { prompt: true, remotePath: null }
  }

  expect(cov.verifyRemotePath(workingObject))
    .resolves
    .toEqual(expectWorkingObject)
})
test('core-options-verify/verifyRemotePath/undefined/prompt', () => {
  const workingObject = {
    userOption: { prompt: true },
    validatedOption: { prompt: true }
  }

  const expectWorkingObject = {
    userOption: { prompt: true },
    validatedOption: { prompt: true, remotePath: null }
  }

  expect(cov.verifyRemotePath(workingObject))
    .resolves
    .toEqual(expectWorkingObject)
})
