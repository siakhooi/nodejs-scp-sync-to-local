const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')

const DEFAULT_SKIPIFSAMEAGE = false
const expectedWarn = [util.format('Warning: skipIfSameAge is undefined, defaulting to %s.', DEFAULT_SKIPIFSAMEAGE)]

test.each([true, 'Y', 'on', 1, 'y', 'yes'])('verifySkipIfSameAge/true', (value) => {
  const workingObject = {
    userOption: { skipIfSameAge: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfSameAge(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameAge: value },
      validatedOption: { skipIfSameAge: true }
    })
})

test.each([false, 'N', 'off', 0, 'n', 'no'])('verifySkipIfSameAge/false', (value) => {
  const workingObject = {
    userOption: { skipIfSameAge: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfSameAge(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameAge: value },
      validatedOption: { skipIfSameAge: false }
    })
})

test('verifySkipIfSameAge/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfSameAge(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { skipIfSameAge: DEFAULT_SKIPIFSAMEAGE }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each([null, ''])('verifySkipIfSameAge/blank', (value) => {
  const workingObject = {
    userOption: { skipIfSameAge: value },
    validatedOption: {}
  }
  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifySkipIfSameAge(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameAge: value },
      validatedOption: { skipIfSameAge: DEFAULT_SKIPIFSAMEAGE }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each(['ANC', '3453', 'xxx', 567])('verifySkipIfSameAge/not-boolaen', (value) => {
  const workingObject = {
    userOption: { skipIfSameAge: value },
    validatedOption: {}
  }
  const msg = util.format('Error: skipIfSameAge is not a boolean value [%s].', value)
  expect(cov.verifySkipIfSameAge(workingObject))
    .rejects
    .toThrow(msg)
})

test('verifySkipIfSameAge/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfSameAge(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        skipIfSameAge: DEFAULT_SKIPIFSAMEAGE,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})

test.each([null, ''])('verifySkipIfSameAge/blank/quiet', (value) => {
  const workingObject = {
    userOption: { skipIfSameAge: value },
    validatedOption: { quiet: true }
  }
  co0.warn = jest.fn()

  expect(cov.verifySkipIfSameAge(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameAge: value },
      validatedOption: {
        skipIfSameAge: DEFAULT_SKIPIFSAMEAGE,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
