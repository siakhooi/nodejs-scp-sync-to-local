const util = require('util')
const cov = require('../../lib/core-options-verify')

const DEFAULT_HOSTNAME = 'localhost'

test('verifyHost', () => {
  const workingObject = {
    userOption: { host: 'localhost' },
    validatedOption: {}
  }

  expect(cov.verifyHost(workingObject))
    .resolves
    .toMatchObject({
      userOption: { host: 'localhost' },
      validatedOption: { host: 'localhost' }
    })
})

test.each([null, ''])('verifyHost/blank', (value) => {
  const workingObject = {
    userOption: { host: value },
    validatedOption: {}
  }

  const warnOutput = []
  global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s) })
  const msg = util.format('Warning: host is undefined, defaulting to %s.', DEFAULT_HOSTNAME)

  expect(cov.verifyHost(workingObject))
    .resolves
    .toMatchObject({
      userOption: { host: value },
      validatedOption: { host: DEFAULT_HOSTNAME }
    })
  expect(console.warn).toBeCalled()
  expect(warnOutput).toContain(msg)
})
test('verifyHost/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  const warnOutput = []
  global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s) })
  const msg = util.format('Warning: host is undefined, defaulting to %s.', DEFAULT_HOSTNAME)

  expect(cov.verifyHost(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { host: DEFAULT_HOSTNAME }
    })
  expect(console.warn).toBeCalled()
  expect(warnOutput).toContain(msg)
})

test.each([null, ''])('verifyHost/blank/quiet', (value) => {
  const workingObject = {
    userOption: { host: value },
    validatedOption: { quiet: true }
  }

  global.console.warn = jest.fn()

  expect(cov.verifyHost(workingObject))
    .resolves
    .toMatchObject({
      userOption: { host: value },
      validatedOption: {
        host: DEFAULT_HOSTNAME,
        quiet: true
      }
    })
  expect(console.warn).not.toBeCalled()
})
test('verifyHost/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }

  global.console.warn = jest.fn()

  expect(cov.verifyHost(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        host: DEFAULT_HOSTNAME,
        quiet: true
      }
    })
  expect(console.warn).not.toBeCalled()
})
