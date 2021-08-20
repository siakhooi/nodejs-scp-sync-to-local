const cov = require('../../lib/core-options-verify')
const util = require('util')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_CUSTOMFILTER = null

const dummyFunction = () => { }

test('core-options-verify/verifyCustomFilter/+', () => {
  const workingObject = {
    userOption: { customFilter: dummyFunction },
    validatedOption: {}
  }

  expect(cov.verifyCustomFilter(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { customFilter: dummyFunction }
    })
})

test('core-options-verify/verifyCustomFilter/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  expect(cov.verifyCustomFilter(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { customFilter: DEFAULT_CUSTOMFILTER }
    })
})

test.each(dt.NotFunctionDataSet)('core-options-verify/verifyCustomFilter/NotFunctionDataSet', (value) => {
  const workingObject = {
    userOption: { customFilter: value },
    validatedOption: {}
  }
  const msg = util.format('Error: customFilter is not a function [%s].', value)
  expect(cov.verifyCustomFilter(workingObject))
    .rejects
    .toThrow(msg)
})

test.each(dt.BlankValueDataSet)('core-options-verify/verifyCustomFilter/BlankValueDataSet', (value) => {
  const workingObject = {
    userOption: { customFilter: value },
    validatedOption: {}
  }

  expect(cov.verifyCustomFilter(workingObject))
    .resolves
    .toMatchObject({
      userOption: { customFilter: value },
      validatedOption: { customFilter: DEFAULT_CUSTOMFILTER }
    })
})
