const cov = require('../../lib/core-options-verify')
const util = require('util')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_POSTPROCESSINGOPTIONS = {}

const dummyOptions = { x: 3 }
test('verifyPostProcessingOptions/OK', () => {
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

test('verifyPostProcessingOptions/undefined', () => {
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

test.each(dt.NotObjectDataSet)('verifyPostProcessingOptions/NotObjectDataSet', (value) => {
  const workingObject = {
    userOption: { postProcessingOptions: value },
    validatedOption: {}
  }
  const msg = util.format('Error: postProcessingOptions is not an object [%s].', JSON.stringify(value))
  expect(cov.verifyPostProcessingOptions(workingObject))
    .rejects
    .toThrow(msg)
})

test.each(dt.BlankValueDataSet)('verifyPostProcessingOptions/BlankValueDataSet', (value) => {
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
