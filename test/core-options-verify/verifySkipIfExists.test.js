const util = require('util')
const cov = require('../../lib/core-options-verify')

const DEFAULT_SKIPIFEXISTS = false

test.each([
  true, 'Y', 'on', 1, 'y', 'yes'
])('verifySkipIfExists/true', (value) => {
  const workingObject = {
    userOption: { skipIfExists: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfExists: value },
      validatedOption: { skipIfExists: true }
    })
})

test.each([
  false, 'N', 'off', 0, 'n', 'no'
])('verifySkipIfExists/false', (value) => {
  const workingObject = {
    userOption: { skipIfExists: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfExists: value },
      validatedOption: { skipIfExists: false }
    })
})

test('verifySkipIfExists/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }
  const warnOutput = []
  global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s) })

  expect(cov.verifySkipIfExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { skipIfExists: DEFAULT_SKIPIFEXISTS }
    })
  const msg = util.format('Warning: skipIfExists undefined, defaulting to %s.', DEFAULT_SKIPIFEXISTS)
  expect(console.warn).toBeCalled()
  expect(warnOutput).toContain(msg)
})

test.each(['ANC', '3453'])('verifySkipIfExists/not-boolean', (value) => {
  const workingObject = {
    userOption: { skipIfExists: value },
    validatedOption: {}
  }
  const msg = util.format('Error: skipIfExists is not a boolean value [%s].', value)
  expect(cov.verifySkipIfExists(workingObject))
    .rejects
    .toThrow(msg)
})

test('verifySkipIfExists/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }
  global.console.warn = jest.fn()

  expect(cov.verifySkipIfExists(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        skipIfExists: DEFAULT_SKIPIFEXISTS,
        quiet: true
      }
    })
  expect(console.warn).not.toBeCalled()
})
