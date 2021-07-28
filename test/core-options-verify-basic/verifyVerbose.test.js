const util = require('util')
const covb = require('../../lib/core-options-verify-basic')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_VERBOSE = false

test.each(dt.TrueDataSet)('verifyVerbose/true', (value) => {
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

test.each([false, 'N', 'off', 0, 'n', 'no'])('verifyVerbose/false', (value) => {
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

test('verifyVerbose/undefined', () => {
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
test.each([null, ''])('verifyVerbose/blank', (value) => {
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

test.each(['ANC', '3453'])('verifyVerbose/not-boolean', (value) => {
  const workingObject = {
    userOption: { verbose: value },
    validatedOption: {}
  }
  const msg = util.format('Error: verbose is not a boolean value [%s].', value)
  expect(covb.verifyVerbose(workingObject))
    .rejects
    .toThrow(msg)
})
