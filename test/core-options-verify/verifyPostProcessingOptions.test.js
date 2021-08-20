const cov = require('../../lib/core-options-verify')
const util = require('util')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_POSTPROCESSINGOPTIONS = {}

const dummyOptions = { x: 3 }
test('core-options-verify/verifyPostProcessingOptions/+', () => {
  const workingObject = {
    userOption: { postProcessingOptions: dummyOptions },
    validatedOption: {}
  }

  expect(cov.verifyPostProcessingOptions(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { postProcessingOptions: dummyOptions }
    })
})

test('core-options-verify/verifyPostProcessingOptions/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  expect(cov.verifyPostProcessingOptions(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { postProcessingOptions: DEFAULT_POSTPROCESSINGOPTIONS }
    })
})

test.each(dt.NotObjectDataSet)('core-options-verify/verifyPostProcessingOptions/NotObjectDataSet', (value) => {
  const workingObject = {
    userOption: { postProcessingOptions: value },
    validatedOption: {}
  }
  const msg = util.format('Error: postProcessingOptions is not an object [%s].', JSON.stringify(value))
  expect(cov.verifyPostProcessingOptions(workingObject))
    .rejects
    .toThrow(msg)
})

test.each(dt.BlankValueDataSet)('core-options-verify/verifyPostProcessingOptions/BlankValueDataSet', (value) => {
  const workingObject = {
    userOption: { postProcessingOptions: value },
    validatedOption: {}
  }

  expect(cov.verifyPostProcessingOptions(workingObject))
    .resolves
    .toMatchObject({
      userOption: { postProcessingOptions: value },
      validatedOption: { postProcessingOptions: DEFAULT_POSTPROCESSINGOPTIONS }
    })
})
