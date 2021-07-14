const util = require('util')
const cov = require('../../lib/core-options-verify')

const DEFAULT_SKIPIFSAMESIZE = false

test.each([true, 'Y', 'on', 1, 'y', 'yes'])('verifySkipIfSameSize/true', (value) => {
  const workingObject = {
    userOption: { skipIfSameSize: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfSameSize(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameSize: value },
      validatedOption: { skipIfSameSize: true }
    })
})

test.each([false, 'N', 'off', 0, 'n', 'no'])('verifySkipIfSameSize/false', (value) => {
  const workingObject = {
    userOption: { skipIfSameSize: value },
    validatedOption: {}
  }

  expect(cov.verifySkipIfSameSize(workingObject))
    .resolves
    .toMatchObject({
      userOption: { skipIfSameSize: value },
      validatedOption: { skipIfSameSize: false }
    })
})

test('verifySkipIfSameSize/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }
  const warnOutput = []
  global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s) })

  expect(cov.verifySkipIfSameSize(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { skipIfSameSize: DEFAULT_SKIPIFSAMESIZE }
    })
  const msg = util.format('Warning: skipIfSameSize undefined, defaulting to %s.', DEFAULT_SKIPIFSAMESIZE)
  expect(console.warn).toBeCalled()
  expect(warnOutput).toContain(msg)
})

test.each(['ANC', '3453', 'xxx', 567])('verifySkipIfSameSize/not-boolaen', (value) => {
  const workingObject = {
    userOption: { skipIfSameSize: value },
    validatedOption: {}
  }
  const msg = util.format('Error: skipIfSameSize is not a boolean value [%s].', value)
  expect(cov.verifySkipIfSameSize(workingObject))
    .rejects
    .toThrow(msg)
})

test('verifySkipIfSameSize/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }
  global.console.warn = jest.fn()

  expect(cov.verifySkipIfSameSize(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        skipIfSameSize: DEFAULT_SKIPIFSAMESIZE,
        quiet: true
      }
    })
  expect(console.warn).not.toBeCalled()
})
