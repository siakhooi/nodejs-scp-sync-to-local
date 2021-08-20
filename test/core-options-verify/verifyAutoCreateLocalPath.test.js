const cov = require('../../lib/core-options-verify')
const util = require('util')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_AUTOCREATELOCALPATH = true

test.each(dt.TrueDataSet)('core-options-verify/verifyAutoCreateLocalPath/TrueDataSet', (value) => {
  const workingObject = {
    userOption: { autoCreateLocalPath: value },
    validatedOption: {}
  }

  expect(cov.verifyAutoCreateLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: { autoCreateLocalPath: value },
      validatedOption: { autoCreateLocalPath: true }
    })
})

test.each(dt.FalseDataSet)('core-options-verify/verifyAutoCreateLocalPath/FalseDataSet', (value) => {
  const workingObject = {
    userOption: { autoCreateLocalPath: value },
    validatedOption: {}
  }

  expect(cov.verifyAutoCreateLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: { autoCreateLocalPath: value },
      validatedOption: { autoCreateLocalPath: false }
    })
})

test('core-options-verify/verifyAutoCreateLocalPath/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  expect(cov.verifyAutoCreateLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { autoCreateLocalPath: DEFAULT_AUTOCREATELOCALPATH }
    })
})

test.each(dt.BlankValueDataSet)('core-options-verify/verifyAutoCreateLocalPath/BlankValueDataSet', (value) => {
  const workingObject = {
    userOption: { autoCreateLocalPath: value },
    validatedOption: {}
  }

  expect(cov.verifyAutoCreateLocalPath(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { autoCreateLocalPath: DEFAULT_AUTOCREATELOCALPATH }
    })
})

test.each(dt.NotBooleanDataSet)('core-options-verify/verifyAutoCreateLocalPath/NotBooleanDataSet', (value) => {
  const workingObject = {
    userOption: { autoCreateLocalPath: value },
    validatedOption: {}
  }
  const msg = util.format('Error: autoCreateLocalPath is not a boolean value [%s].', value)
  expect(cov.verifyAutoCreateLocalPath(workingObject))
    .rejects
    .toThrow(msg)
})
