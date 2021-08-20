const util = require('util')
const covb = require('../../lib/core-options-verify-basic')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_VERBOSE = false

test.each(dt.TrueDataSet)('core-options-verify-basic/verifyVerbose/TrueDataSet', (value) => {
  const workingObject = {
    userOption: { verbose: value },
    validatedOption: {}
  }

  expect(covb.verifyVerbose(workingObject))
    .resolves
    .toMatchObject({
      userOption: { verbose: value },
      validatedOption: { verbose: true }
    })
})

test.each(dt.FalseDataSet)('core-options-verify-basic/verifyVerbose/FalseDataSet', (value) => {
  const workingObject = {
    userOption: { verbose: value },
    validatedOption: {}
  }

  expect(covb.verifyVerbose(workingObject))
    .resolves
    .toMatchObject({
      userOption: { verbose: value },
      validatedOption: { verbose: false }
    })
})

test('core-options-verify-basic/verifyVerbose/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  expect(covb.verifyVerbose(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { verbose: DEFAULT_VERBOSE }
    })
})
test.each(dt.BlankValueDataSet)('core-options-verify-basic/verifyVerbose/BlankValueDataSet', (value) => {
  const workingObject = {
    userOption: { verbose: value },
    validatedOption: {}
  }

  expect(covb.verifyVerbose(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { verbose: DEFAULT_VERBOSE }
    })
})

test.each(dt.NotBooleanDataSet)('core-options-verify-basic/verifyVerbose/NotBooleanDataSet', (value) => {
  const workingObject = {
    userOption: { verbose: value },
    validatedOption: {}
  }
  const msg = util.format('Error: verbose is not a boolean value [%s].', value)
  expect(covb.verifyVerbose(workingObject))
    .rejects
    .toThrow(msg)
})
