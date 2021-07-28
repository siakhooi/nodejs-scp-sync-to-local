const util = require('util')
const cov = require('../../lib/core-options-verify')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')

const DEFAULT_HOSTNAME = 'localhost'

const expectedWarn = [
  util.format('Warning: host is undefined, defaulting to %s.', DEFAULT_HOSTNAME)
]

test('verifyHost/0', () => {
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

  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifyHost(workingObject))
    .resolves
    .toMatchObject({
      userOption: { host: value },
      validatedOption: { host: DEFAULT_HOSTNAME }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})
test('verifyHost/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  const w = new m.MockOutput()
  co0.warn = w.fn()

  expect(cov.verifyHost(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { host: DEFAULT_HOSTNAME }
    })
  expect(w.verify(expectedWarn)).resolves.toBe(true)
})

test.each([null, ''])('verifyHost/blank/quiet', (value) => {
  const workingObject = {
    userOption: { host: value },
    validatedOption: { quiet: true }
  }

  co0.warn = jest.fn()

  expect(cov.verifyHost(workingObject))
    .resolves
    .toMatchObject({
      userOption: { host: value },
      validatedOption: {
        host: DEFAULT_HOSTNAME,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
test('verifyHost/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }

  co0.warn = jest.fn()

  expect(cov.verifyHost(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        host: DEFAULT_HOSTNAME,
        quiet: true
      }
    })
  expect(co0.warn).not.toBeCalled()
})
