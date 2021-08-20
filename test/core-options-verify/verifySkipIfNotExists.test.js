const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_SKIPIFNOTEXISTS = false
const expectedWarn = [util.format('Warning: skipIfNotExists is undefined, defaulting to %s.', DEFAULT_SKIPIFNOTEXISTS)]

test.each(dt.TrueDataSet)('core-options-verify/verifySkipIfNotExists/TrueDataSet', (value) => {
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

test.each(dt.FalseDataSet)('core-options-verify/verifySkipIfNotExists/FalseDataSet', (value) => {
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

test('core-options-verify/verifySkipIfNotExists/undefined', () => {
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
test.each(dt.BlankValueDataSet)('core-options-verify/verifySkipIfNotExists/BlankValueDataSet', (value) => {
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

test.each(dt.NotBooleanDataSet)('core-options-verify/verifySkipIfNotExists/NotBooleanDataSet', (value) => {
  const workingObject = {
    userOption: { skipIfNotExists: value },
    validatedOption: {}
  }
  const msg = util.format('Error: skipIfNotExists is not a boolean value [%s].', value)
  expect(cov.verifySkipIfNotExists(workingObject))
    .rejects
    .toThrow(msg)
})

test('core-options-verify/verifySkipIfNotExists/undefined/quiet', () => {
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
test.each(dt.BlankValueDataSet)('core-options-verify/verifySkipIfNotExists/BlankValueDataSet/quiet', (value) => {
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
