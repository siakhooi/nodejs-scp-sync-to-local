const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_SKIPIFBIGGER = false
const expectedWarn = [util.format('Warning: skipIfBigger is undefined, defaulting to %s.', DEFAULT_SKIPIFBIGGER)]

test.each(dt.TrueDataSet)('core-options-verify/verifySkipIfBigger/TrueDataSet', (value) => {
  const workingObject = {
    userOption: { skipIfBigger: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfBigger(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfBigger: value },
      validatedOption: { skipIfBigger: true }
    })
})

test.each(dt.FalseDataSet)('core-options-verify/verifySkipIfBigger/FalseDataSet', (value) => {
  const workingObject = {
    userOption: { skipIfBigger: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfBigger(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfBigger: value },
      validatedOption: { skipIfBigger: false }
    })
})

test('core-options-verify/verifySkipIfBigger/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfBigger(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { skipIfBigger: DEFAULT_SKIPIFBIGGER }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})
test.each(dt.BlankValueDataSet)('core-options-verify/verifySkipIfBigger/BlankValueDataSet', (value) => {
  const workingObject = {
    userOption: { skipIfBigger: value },
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfBigger(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfBigger: value },
      validatedOption: { skipIfBigger: DEFAULT_SKIPIFBIGGER }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each(dt.NotBooleanDataSet)('core-options-verify/verifySkipIfBigger/NotBooleanDataSet', (value) => {
  const workingObject = {
    userOption: { skipIfBigger: value },
    validatedOption: {}
  }
  const msg = util.format('Error: skipIfBigger is not a boolean value [%s].', value)
  expect(cov.verifySkipIfBigger(workingObject))
    .rejects
    .toThrow(msg)
})

test('core-options-verify/verifySkipIfBigger/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfBigger(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        skipIfBigger: DEFAULT_SKIPIFBIGGER,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
test.each(dt.BlankValueDataSet)('core-options-verify/verifySkipIfBigger/BlankValueDataSet/quiet', (value) => {
  const workingObject = {
    userOption: { skipIfBigger: value },
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfBigger(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfBigger: value },
      validatedOption: {
        skipIfBigger: DEFAULT_SKIPIFBIGGER,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
