const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_SKIPIFEXISTS = false

const expectedWarn = [util.format('Warning: skipIfExists is undefined, defaulting to %s.', DEFAULT_SKIPIFEXISTS)]

test.each(dt.TrueDataSet)('verifySkipIfExists/TrueDataSet', (value) => {
  const workingObject = {
    userOption: { skipIfExists: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfExists: value },
      validatedOption: { skipIfExists: true }
    })
})

test.each(dt.FalseDataSet)('verifySkipIfExists/FalseDataSet', (value) => {
  const workingObject = {
    userOption: { skipIfExists: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfExists: value },
      validatedOption: { skipIfExists: false }
    })
})

test('verifySkipIfExists/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { skipIfExists: DEFAULT_SKIPIFEXISTS }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})
test.each(dt.BlankValueDataSet)('verifySkipIfExists/BlankValueDataSet', (value) => {
  const workingObject = {
    userOption: { skipIfExists: value },
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfExists: value },
      validatedOption: { skipIfExists: DEFAULT_SKIPIFEXISTS }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each(dt.NotBooleanDataSet)('verifySkipIfExists/NotBooleanDataSet', (value) => {
  const workingObject = {
    userOption: { skipIfExists: value },
    validatedOption: {}
  }
  const msg = util.format('Error: skipIfExists is not a boolean value [%s].', value)
  expect(cov.verifySkipIfExists(workingObject))
    .rejects
    .toThrow(msg)
})

test('verifySkipIfExists/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        skipIfExists: DEFAULT_SKIPIFEXISTS,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})

test.each(dt.BlankValueDataSet)('verifySkipIfExists/BlankValueDataSet/quiet', (value) => {
  const workingObject = {
    userOption: { skipIfExists: value },
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfExists: value },
      validatedOption: {
        skipIfExists: DEFAULT_SKIPIFEXISTS,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
