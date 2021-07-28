const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_SKIPIFSAMESIZE = false
const expectedWarn = [util.format('Warning: skipIfSameSize is undefined, defaulting to %s.', DEFAULT_SKIPIFSAMESIZE)]

test.each(dt.TrueDataSet)('verifySkipIfSameSize/true', (value) => {
  const workingObject = {
    userOption: { skipIfSameSize: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfSameSize(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameSize: value },
      validatedOption: { skipIfSameSize: true }
    })
})

test.each(dt.FalseDataSet)('verifySkipIfSameSize/false', (value) => {
  const workingObject = {
    userOption: { skipIfSameSize: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfSameSize(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameSize: value },
      validatedOption: { skipIfSameSize: false }
    })
})

test('verifySkipIfSameSize/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfSameSize(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { skipIfSameSize: DEFAULT_SKIPIFSAMESIZE }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each(dt.BlankValueDataSet)('verifySkipIfSameSize/blank', (value) => {
  const workingObject = {
    userOption: { skipIfSameSize: value },
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfSameSize(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameSize: value },
      validatedOption: { skipIfSameSize: DEFAULT_SKIPIFSAMESIZE }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each(dt.NotBooleanDataSet)('verifySkipIfSameSize/not-boolaen', (value) => {
  const workingObject = {
    userOption: { skipIfSameSize: value },
    validatedOption: {}
  }
  const msg = util.format('Error: skipIfSameSize is not a boolean value [%s].', value)
  expect(cov.verifySkipIfSameSize(workingObject))
    .rejects
    .toThrow(msg)
})

test('verifySkipIfSameSize/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfSameSize(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        skipIfSameSize: DEFAULT_SKIPIFSAMESIZE,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})

test.each(dt.BlankValueDataSet)('verifySkipIfSameSize/blank/quiet', (value) => {
  const workingObject = {
    userOption: { skipIfSameSize: value },
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfSameSize(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameSize: value },
      validatedOption: {
        skipIfSameSize: DEFAULT_SKIPIFSAMESIZE,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
