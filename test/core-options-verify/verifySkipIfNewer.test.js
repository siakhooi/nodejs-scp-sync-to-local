const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_SKIPIFNEWER = false
const expectedWarn = [util.format('Warning: skipIfNewer is undefined, defaulting to %s.', DEFAULT_SKIPIFNEWER)]

test.each(dt.TrueDataSet)('verifySkipIfNewer/true', (value) => {
  const workingObject = {
    userOption: { skipIfNewer: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfNewer(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfNewer: value },
      validatedOption: { skipIfNewer: true }
    })
})

test.each(dt.FalseDataSet)('verifySkipIfNewer/false', (value) => {
  const workingObject = {
    userOption: { skipIfNewer: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfNewer(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfNewer: value },
      validatedOption: { skipIfNewer: false }
    })
})

test('verifySkipIfNewer/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfNewer(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { skipIfNewer: DEFAULT_SKIPIFNEWER }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each([null, ''])('verifySkipIfNewer/blank', (value) => {
  const workingObject = {
    userOption: { skipIfNewer: value },
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfNewer(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfNewer: value },
      validatedOption: { skipIfNewer: DEFAULT_SKIPIFNEWER }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each(dt.NotBooleanDataSet)('verifySkipIfNewer/not-boolaen', (value) => {
  const workingObject = {
    userOption: { skipIfNewer: value },
    validatedOption: {}
  }
  const msg = util.format('Error: skipIfNewer is not a boolean value [%s].', value)
  expect(cov.verifySkipIfNewer(workingObject))
    .rejects
    .toThrow(msg)
})

test('verifySkipIfNewer/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfNewer(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        skipIfNewer: DEFAULT_SKIPIFNEWER,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
test.each([null, ''])('verifySkipIfNewer/blank/quiet', (value) => {
  const workingObject = {
    userOption: { skipIfNewer: value },
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfNewer(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfNewer: value },
      validatedOption: {
        skipIfNewer: DEFAULT_SKIPIFNEWER,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
