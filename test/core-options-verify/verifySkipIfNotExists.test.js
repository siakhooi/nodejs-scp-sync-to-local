const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_SKIPIFNOTEXISTS = false
const expectedWarn = [util.format('Warning: skipIfNotExists is undefined, defaulting to %s.', DEFAULT_SKIPIFNOTEXISTS)]

test.each(dt.TrueDataSet)('verifySkipIfNotExists/true', (value) => {
  const workingObject = {
    userOption: { skipIfNotExists: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfNotExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfNotExists: value },
      validatedOption: { skipIfNotExists: true }
    })
})

test.each(dt.FalseDataSet)('verifySkipIfNotExists/false', (value) => {
  const workingObject = {
    userOption: { skipIfNotExists: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfNotExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfNotExists: value },
      validatedOption: { skipIfNotExists: false }
    })
})

test('verifySkipIfNotExists/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfNotExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { skipIfNotExists: DEFAULT_SKIPIFNOTEXISTS }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})
test.each([null, ''])('verifySkipIfNotExists/blank', (value) => {
  const workingObject = {
    userOption: { skipIfNotExists: value },
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfNotExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfNotExists: value },
      validatedOption: { skipIfNotExists: DEFAULT_SKIPIFNOTEXISTS }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each(dt.NotBooleanDataSet)('verifySkipIfNotExists/not-boolaen', (value) => {
  const workingObject = {
    userOption: { skipIfNotExists: value },
    validatedOption: {}
  }
  const msg = util.format('Error: skipIfNotExists is not a boolean value [%s].', value)
  expect(cov.verifySkipIfNotExists(workingObject))
    .rejects
    .toThrow(msg)
})

test('verifySkipIfNotExists/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfNotExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        skipIfNotExists: DEFAULT_SKIPIFNOTEXISTS,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
test.each([null, ''])('verifySkipIfNotExists/blank/quiet', (value) => {
  const workingObject = {
    userOption: { skipIfNotExists: value },
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfNotExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfNotExists: value },
      validatedOption: {
        skipIfNotExists: DEFAULT_SKIPIFNOTEXISTS,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
