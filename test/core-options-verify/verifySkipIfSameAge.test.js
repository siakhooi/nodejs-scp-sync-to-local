const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_SKIPIFSAMEAGE = false
const expectedWarn = [util.format('Warning: skipIfSameAge is undefined, defaulting to %s.', DEFAULT_SKIPIFSAMEAGE)]

test.each(dt.TrueDataSet)('core-options-verify/verifySkipIfSameAge/TrueDataSet', (value) => {
  const workingObject = {
    userOption: { skipIfSameAge: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfSameAge(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameAge: value },
      validatedOption: { skipIfSameAge: true }
    })
})

test.each(dt.FalseDataSet)('core-options-verify/verifySkipIfSameAge/FalseDataSet', (value) => {
  const workingObject = {
    userOption: { skipIfSameAge: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfSameAge(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameAge: value },
      validatedOption: { skipIfSameAge: false }
    })
})

test('core-options-verify/verifySkipIfSameAge/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfSameAge(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { skipIfSameAge: DEFAULT_SKIPIFSAMEAGE }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each(dt.BlankValueDataSet)('core-options-verify/verifySkipIfSameAge/BlankValueDataSet', (value) => {
  const workingObject = {
    userOption: { skipIfSameAge: value },
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfSameAge(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameAge: value },
      validatedOption: { skipIfSameAge: DEFAULT_SKIPIFSAMEAGE }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each(dt.NotBooleanDataSet)('core-options-verify/verifySkipIfSameAge/NotBooleanDataSet', (value) => {
  const workingObject = {
    userOption: { skipIfSameAge: value },
    validatedOption: {}
  }
  const msg = util.format('Error: skipIfSameAge is not a boolean value [%s].', value)
  expect(cov.verifySkipIfSameAge(workingObject))
    .rejects
    .toThrow(msg)
})

test('core-options-verify/verifySkipIfSameAge/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfSameAge(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        skipIfSameAge: DEFAULT_SKIPIFSAMEAGE,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})

test.each(dt.BlankValueDataSet)('core-options-verify/verifySkipIfSameAge/BlankValueDataSet/quiet', (value) => {
  const workingObject = {
    userOption: { skipIfSameAge: value },
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfSameAge(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameAge: value },
      validatedOption: {
        skipIfSameAge: DEFAULT_SKIPIFSAMEAGE,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
