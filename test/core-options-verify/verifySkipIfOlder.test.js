const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_SKIPIFOLDER = false
const expectedWarn = [util.format('Warning: skipIfOlder is undefined, defaulting to %s.', DEFAULT_SKIPIFOLDER)]

test.each(dt.TrueDataSet)('verifySkipIfOlder/true', (value) => {
  const workingObject = {
    userOption: { skipIfOlder: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfOlder(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfOlder: value },
      validatedOption: { skipIfOlder: true }
    })
})

test.each(dt.FalseDataSet)('verifySkipIfOlder/false', (value) => {
  const workingObject = {
    userOption: { skipIfOlder: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfOlder(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfOlder: value },
      validatedOption: { skipIfOlder: false }
    })
})

test('verifySkipIfOlder/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfOlder(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { skipIfOlder: DEFAULT_SKIPIFOLDER }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each(dt.BlankValueDataSet)('verifySkipIfOlder/blank', (value) => {
  const workingObject = {
    userOption: { skipIfOlder: value },
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfOlder(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfOlder: value },
      validatedOption: { skipIfOlder: DEFAULT_SKIPIFOLDER }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})
test.each(dt.NotBooleanDataSet)('verifySkipIfOlder/not-boolaen', (value) => {
  const workingObject = {
    userOption: { skipIfOlder: value },
    validatedOption: {}
  }
  const msg = util.format('Error: skipIfOlder is not a boolean value [%s].', value)
  expect(cov.verifySkipIfOlder(workingObject))
    .rejects
    .toThrow(msg)
})

test('verifySkipIfOlder/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfOlder(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        skipIfOlder: DEFAULT_SKIPIFOLDER,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})

test.each(dt.BlankValueDataSet)('verifySkipIfOlder/blank/quiet', (value) => {
  const workingObject = {
    userOption: { skipIfOlder: value },
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfOlder(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfOlder: value },
      validatedOption: {
        skipIfOlder: DEFAULT_SKIPIFOLDER,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
