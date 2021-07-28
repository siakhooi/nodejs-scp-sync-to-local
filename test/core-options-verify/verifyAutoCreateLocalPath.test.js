const cov = require('../../lib/core-options-verify')
const util = require('util')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_AUTOCREATELOCALPATH = true

test.each(dt.TrueDataSet)('verifyAutoCreateLocalPath/true', (value) => {
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

test.each(dt.FalseDataSet)('verifyAutoCreateLocalPath/false', (value) => {
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

test('verifyAutoCreateLocalPath/undefined', () => {
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

test.each(dt.BlankValueDataSet)('verifyAutoCreateLocalPath/blank', (value) => {
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

test.each(dt.NotBooleanDataSet)('verifyAutoCreateLocalPath/not-boolean', (value) => {
  const workingObject = {
    userOption: { autoCreateLocalPath: value },
    validatedOption: {}
  }
  const msg = util.format('Error: autoCreateLocalPath is not a boolean value [%s].', value)
  expect(cov.verifyAutoCreateLocalPath(workingObject))
    .rejects
    .toThrow(msg)
})
