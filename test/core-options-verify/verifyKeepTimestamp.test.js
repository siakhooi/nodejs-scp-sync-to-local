const util = require('util')
const cov = require('../../lib/core-options-verify')

const DEFAULT_KEEPTIMESTAMP = false

test.each([
  true, 'Y', 'on', 1, 'y', 'yes'
])('verifyKeepTimestamp/true', (value) => {
  const workingObject = {
    userOption: { keepTimestamp: value },
    validatedOption: {}
  }

  expect(cov.verifyKeepTimestamp(workingObject))
    .resolves
    .toMatchObject({
      userOption: { keepTimestamp: value },
      validatedOption: { keepTimestamp: true }
    })
})

test.each([
  false, 'N', 'off', 0, 'n', 'no'
])('verifyKeepTimestamp/false', (value) => {
  const workingObject = {
    userOption: { keepTimestamp: value },
    validatedOption: {}
  }

  expect(cov.verifyKeepTimestamp(workingObject))
    .resolves
    .toMatchObject({
      userOption: { keepTimestamp: value },
      validatedOption: { keepTimestamp: false }
    })
})

test('verifyKeepTimestamp/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }
  global.console.warn = jest.fn()

  expect(cov.verifyKeepTimestamp(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { keepTimestamp: DEFAULT_KEEPTIMESTAMP }
    })
  expect(console.warn).not.toBeCalled()
})

test.each(['ANC', '3453'])('verifyKeepTimestamp/not-boolean', (value) => {
  const workingObject = {
    userOption: { keepTimestamp: value },
    validatedOption: {}
  }
  const msg = util.format('Error: keepTimestamp is not a boolean value [%s].', value)
  expect(cov.verifyKeepTimestamp(workingObject))
    .rejects
    .toThrow(msg)
})

test('verifyKeepTimestamp/undefined/quiet', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true }
  }
  global.console.warn = jest.fn()

  expect(cov.verifyKeepTimestamp(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        keepTimestamp: DEFAULT_KEEPTIMESTAMP,
        quiet: true
      }
    })
  expect(console.warn).not.toBeCalled()
})
