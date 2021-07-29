const cov = require('../../lib/core-options-verify')
const util = require('util')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_POSTPROCESSING = null

const dummyFunction = () => { }

test('verifyPostProcessing/good', () => {
  const workingObject = {
    userOption: { postProcessing: dummyFunction },
    validatedOption: {}
  }

  expect(cov.verifyPostProcessing(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { postProcessing: dummyFunction }
    })
})

test('verifyPostProcessing/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  expect(cov.verifyPostProcessing(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { postProcessing: DEFAULT_POSTPROCESSING }
    })
})

test.each(dt.NotFunctionDataSet)('verifyPostProcessing/not-function', (value) => {
  const workingObject = {
    userOption: { postProcessing: value },
    validatedOption: {}
  }
  const msg = util.format('Error: postProcessing is not a function [%s].', value)
  expect(cov.verifyPostProcessing(workingObject))
    .rejects
    .toThrow(msg)
})

test.each(dt.BlankValueDataSet)('verifyPostProcessing/blank', (value) => {
  const workingObject = {
    userOption: { postProcessing: value },
    validatedOption: {}
  }

  expect(cov.verifyPostProcessing(workingObject))
    .resolves
    .toMatchObject({
      userOption: { postProcessing: value },
      validatedOption: { postProcessing: DEFAULT_POSTPROCESSING }
    })
})
