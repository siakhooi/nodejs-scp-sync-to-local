const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_SKIPIFSMALLER = false
const expectedWarn = [util.format('Warning: skipIfSmaller is undefined, defaulting to %s.', DEFAULT_SKIPIFSMALLER)]

test.each(dt.TrueDataSet)('verifySkipIfSmaller/true', (value) => {
  const workingObject = {
    userOption: { skipIfSmaller: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfSmaller(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSmaller: value },
      validatedOption: { skipIfSmaller: true }
    })
})

test.each(dt.FalseDataSet)('verifySkipIfSmaller/false', (value) => {
  const workingObject = {
    userOption: { skipIfSmaller: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfSmaller(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSmaller: value },
      validatedOption: { skipIfSmaller: false }
    })
})

test('verifySkipIfSmaller/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfSmaller(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { skipIfSmaller: DEFAULT_SKIPIFSMALLER }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each([null, ''])('verifySkipIfSmaller/blank', (value) => {
  const workingObject = {
    userOption: { skipIfSmaller: value },
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfSmaller(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSmaller: value },
      validatedOption: { skipIfSmaller: DEFAULT_SKIPIFSMALLER }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each(dt.NotBooleanDataSet)('verifySkipIfSmaller/not-boolaen', (value) => {
  const workingObject = {
    userOption: { skipIfSmaller: value },
    validatedOption: {}
  }
  const msg = util.format('Error: skipIfSmaller is not a boolean value [%s].', value)
  expect(cov.verifySkipIfSmaller(workingObject))
    .rejects
    .toThrow(msg)
})

test('verifySkipIfSmaller/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfSmaller(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        skipIfSmaller: DEFAULT_SKIPIFSMALLER,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})

test.each([null, ''])('verifySkipIfSmaller/blank/quiet', (value) => {
  const workingObject = {
    userOption: { skipIfSmaller: value },
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfSmaller(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSmaller: value },
      validatedOption: {
        skipIfSmaller: DEFAULT_SKIPIFSMALLER,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
