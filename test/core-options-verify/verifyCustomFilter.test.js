const cov = require('../../lib/core-options-verify')
const util = require('util')
const dt = require('../mock-data/common-data-sets')

const DEFAULT_CUSTOMFILTER = null

const dummyFunction = () => { }

test('verifyCustomFilter/good', () => {
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

test('verifyCustomFilter/undefined', () => {
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

test.each(['ANC', 3453, true])('verifyCustomFilter/not-function', (value) => {
  const workingObject = {
    userOption: { customFilter: value },
    validatedOption: {}
  }
  const msg = util.format('Error: customFilter is not a function [%s].', value)
  expect(cov.verifyCustomFilter(workingObject))
    .rejects
    .toThrow(msg)
})

test.each(dt.BlankValueDataSet)('verifyCustomFilter/blank', (value) => {
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
