const util = require('util')
const covb = require('../../lib/core-options-verify-basic')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_PROMPT = false

test.each(dt.TrueDataSet)('core-options-verify-basic/verifyPrompt/TrueDataSet', (value) => {
  const workingObject = {
    userOption: { prompt: value },
    validatedOption: {}
  }

  expect(covb.verifyPrompt(workingObject))
    .resolves
    .toMatchObject({
      userOption: { prompt: value },
      validatedOption: { prompt: true }
    })
})

test.each(dt.FalseDataSet)('core-options-verify-basic/verifyPrompt/FalseDataSet', (value) => {
  const workingObject = {
    userOption: { prompt: value },
    validatedOption: {}
  }

  expect(covb.verifyPrompt(workingObject))
    .resolves
    .toMatchObject({
      userOption: { prompt: value },
      validatedOption: { prompt: false }
    })
})

test('core-options-verify-basic/verifyPrompt/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  expect(covb.verifyPrompt(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { prompt: DEFAULT_PROMPT }
    })
})

test.each(dt.BlankValueDataSet)('core-options-verify-basic/verifyPrompt/BlankValueDataSet', (value) => {
  const workingObject = {
    userOption: { prompt: value },
    validatedOption: {}
  }

  expect(covb.verifyPrompt(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { prompt: DEFAULT_PROMPT }
    })
})

test.each(dt.NotBooleanDataSet)('core-options-verify-basic/verifyPrompt/NotBooleanDataSet', (value) => {
  const workingObject = {
    userOption: { prompt: value },
    validatedOption: {}
  }
  const msg = util.format('Error: prompt is not a boolean value [%s].', value)
  expect(covb.verifyPrompt(workingObject))
    .rejects
    .toThrow(msg)
})
