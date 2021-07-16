const util = require('util')
const cov = require('../../lib/core-options-verify')

const DEFAULT_SKIPIFOLDER = false

test.each([true, 'Y', 'on', 1, 'y', 'yes'])('verifySkipIfOlder/true', (value) => {
  const workingObject = {
    userOption: { skipIfOlder: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfOlder(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfOlder: value },
      validatedOption: { skipIfOlder: true }
    })
})

test.each([false, 'N', 'off', 0, 'n', 'no'])('verifySkipIfOlder/false', (value) => {
  const workingObject = {
    userOption: { skipIfOlder: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfOlder(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfOlder: value },
      validatedOption: { skipIfOlder: false }
    })
})

test('verifySkipIfOlder/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }
  const warnOutput = []
  global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s) })

  expect(cov.verifySkipIfOlder(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { skipIfOlder: DEFAULT_SKIPIFOLDER }
    })
  const msg = util.format('Warning: skipIfOlder undefined, defaulting to %s.', DEFAULT_SKIPIFOLDER)
  expect(console.warn).toBeCalled()
  expect(warnOutput).toContain(msg)
})

test.each([null, ''])('verifySkipIfOlder/blank', (value) => {
  const workingObject = {
    userOption: { skipIfOlder: value },
    validatedOption: {}
  }
  const warnOutput = []
  global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s) })

  expect(cov.verifySkipIfOlder(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfOlder: value },
      validatedOption: { skipIfOlder: DEFAULT_SKIPIFOLDER }
    })
  const msg = util.format('Warning: skipIfOlder undefined, defaulting to %s.', DEFAULT_SKIPIFOLDER)
  expect(console.warn).toBeCalled()
  expect(warnOutput).toContain(msg)
})
test.each(['ANC', '3453', 'xxx', 567])('verifySkipIfOlder/not-boolaen', (value) => {
  const workingObject = {
    userOption: { skipIfOlder: value },
    validatedOption: {}
  }
  const msg = util.format('Error: skipIfOlder is not a boolean value [%s].', value)
  expect(cov.verifySkipIfOlder(workingObject))
    .rejects
    .toThrow(msg)
})

test('verifySkipIfOlder/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }
  global.console.warn = jest.fn()

  expect(cov.verifySkipIfOlder(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        skipIfOlder: DEFAULT_SKIPIFOLDER,
        quiet: true
      }
    })
  expect(console.warn).not.toBeCalled()
})

test.each([null, ''])('verifySkipIfOlder/blank/quiet', (value) => {
  const workingObject = {
    userOption: { skipIfOlder: value },
    validatedOption: { quiet: true }
  }
  global.console.warn = jest.fn()

  expect(cov.verifySkipIfOlder(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfOlder: value },
      validatedOption: {
        skipIfOlder: DEFAULT_SKIPIFOLDER,
        quiet: true
      }
    })
  expect(console.warn).not.toBeCalled()
})
