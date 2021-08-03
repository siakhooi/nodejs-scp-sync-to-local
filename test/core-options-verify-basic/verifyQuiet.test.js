const util = require('util')
const covb = require('../../lib/core-options-verify-basic')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_QUIET = false

test.each(dt.TrueDataSet)('verifyQuiet/TrueDataSet', (value) => {
  const workingObject = {
    userOption: { quiet: value },
    validatedOption: {}
  }

  expect(covb.verifyQuiet(workingObject))
    .resolves
    .toMatchObject({
      userOption: { quiet: value },
      validatedOption: { quiet: true }
    })
})

test.each(dt.FalseDataSet)('verifyQuiet/FalseDataSet', (value) => {
  const workingObject = {
    userOption: { quiet: value },
    validatedOption: {}
  }

  expect(covb.verifyQuiet(workingObject))
    .resolves
    .toMatchObject({
      userOption: { quiet: value },
      validatedOption: { quiet: false }
    })
})

test('verifyQuiet/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  expect(covb.verifyQuiet(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { quiet: DEFAULT_QUIET }
    })
})

test.each(dt.BlankValueDataSet)('verifyQuiet/BlankValueDataSet', (value) => {
  const workingObject = {
    userOption: { quiet: value },
    validatedOption: {}
  }

  expect(covb.verifyQuiet(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { quiet: DEFAULT_QUIET }
    })
})

test.each(dt.NotBooleanDataSet)('verifyQuiet/NotBooleanDataSet', (value) => {
  const workingObject = {
    userOption: { quiet: value },
    validatedOption: {}
  }
  const msg = util.format('Error: quiet is not a boolean value [%s].', value)
  expect(covb.verifyQuiet(workingObject))
    .rejects
    .toThrow(msg)
})
