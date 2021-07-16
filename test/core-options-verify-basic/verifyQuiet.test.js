const util = require('util')
const covb = require('../../lib/core-options-verify-basic')

const DEFAULT_QUIET = false

test.each([true, 'Y', 'on', 1, 'y', 'yes'])('verifyQuiet/true', (value) => {
  const workingObject = {
    userOption: { quiet: value },
    validatedOption: {}
  }

  expect(covb.verifyQuiet(workingObject))
    .resolves
    .toMatchObject({
      userOption: { quiet: value },
      validatedOption: { quiet: true }
    })
})

test.each([false, 'N', 'off', 0, 'n', 'no'])('verifyQuiet/false', (value) => {
  const workingObject = {
    userOption: { quiet: value },
    validatedOption: {}
  }

  expect(covb.verifyQuiet(workingObject))
    .resolves
    .toMatchObject({
      userOption: { quiet: value },
      validatedOption: { quiet: false }
    })
})

test('verifyQuiet/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  expect(covb.verifyQuiet(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { quiet: DEFAULT_QUIET }
    })
})

test.each([null, ''])('verifyQuiet/blank', (value) => {
  const workingObject = {
    userOption: { quiet: value },
    validatedOption: {}
  }

  expect(covb.verifyQuiet(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { quiet: DEFAULT_QUIET }
    })
})

test.each(['ANC', '3453'])('verifyQuiet/not-boolean', (value) => {
  const workingObject = {
    userOption: { quiet: value },
    validatedOption: {}
  }
  const msg = util.format('Error: quiet is not a boolean value [%s].', value)
  expect(covb.verifyQuiet(workingObject))
    .rejects
    .toThrow(msg)
})
