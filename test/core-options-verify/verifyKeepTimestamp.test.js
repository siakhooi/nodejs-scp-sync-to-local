const util = require('util')
const cov = require('../../lib/core-options-verify')
const cou = require('../../lib/core-output')

const DEFAULT_KEEPTIMESTAMP = false

test.each([true, 'Y', 'on', 1, 'y', 'yes'])('verifyKeepTimestamp/true', (value) => {
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

test.each([false, 'N', 'off', 0, 'n', 'no'])('verifyKeepTimestamp/false', (value) => {
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
  cou.warn = jest.fn()

  expect(cov.verifyKeepTimestamp(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { keepTimestamp: DEFAULT_KEEPTIMESTAMP }
    })
  expect(cou.warn).not.toBeCalled()
})
test.each([null, ''])('verifyKeepTimestamp/blank', (value) => {
  const workingObject = {
    userOption: { keepTimestamp: value },
    validatedOption: {}
  }

  expect(cov.verifyKeepTimestamp(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: { keepTimestamp: DEFAULT_KEEPTIMESTAMP }
    })
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
  cou.warn = jest.fn()

  expect(cov.verifyKeepTimestamp(workingObject))
    .resolves
    .toMatchObject({
      userOption: {},
      validatedOption: {
        keepTimestamp: DEFAULT_KEEPTIMESTAMP,
        quiet: true
      }
    })
  expect(cou.warn).not.toBeCalled()
})

test.each([null, ''])('verifyKeepTimestamp/blank/quiet', (value) => {
  const workingObject = {
    userOption: { keepTimestamp: value },
    validatedOption: { quiet: true }
  }

  cou.warn = jest.fn()

  expect(cov.verifyKeepTimestamp(workingObject))
    .resolves
    .toMatchObject({
      userOption: { keepTimestamp: value },
      validatedOption: {
        keepTimestamp: DEFAULT_KEEPTIMESTAMP,
        quiet: true
      }
    })
  expect(cou.warn).not.toBeCalled()
})
