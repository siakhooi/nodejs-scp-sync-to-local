const co0 = require('../../lib/core-options')
const cou = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

test('crossVerify/skip/error', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { skipIfExists: true, skipIfNotExists: true }
  }

  expect(co0.crossVerify(workingObject))
    .rejects
    .toThrow('Error: skipIfExists and skipIfNotExists are mutually exclusive.')
})

test.each([
  [true, false],
  [false, true],
  [false, false]
])('crossVerify/skip/ok', (exist, notExist) => {
  const workingObject = {
    userOption: {},
    validatedOption: { skipIfExists: exist, skipIfNotExists: notExist }
  }

  cou.warn = jest.fn()
  co0.crossVerify(workingObject)
    .then(() => {
      expect(cou.warn).not.toBeCalled()
    })
})

test('crossVerify/checkQuietAndVerbose/override', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true, verbose: true }
  }

  const w = new m.MockOutput()
  cou.warn = w.fn()

  const expectedWarn = ['Warn: Both quiet and verbose are set to true, verbose is ignored.']

  co0.crossVerify(workingObject).then(() => {
    expect(w.verify(expectedWarn)).resolves.toBe(true)
  })
})

test.each([
  [true, false],
  [false, true],
  [false, false]
])('crossVerify/checkQuietAndVerbose/ok', (quiet, verbose) => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: quiet, verbose: verbose }
  }

  cou.warn = jest.fn()
  co0.crossVerify(workingObject).then(() => {
    expect(cou.warn).not.toBeCalled()
  })
})

test.each(dt.CorrectPortNumber)('crossVerify/checkPortNumberRange/ok', (value) => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: false, verbose: false, port: value }
  }

  cou.warn = jest.fn()
  co0.crossVerify(workingObject).then(() => {
    expect(cou.warn).not.toBeCalled()
  })
})
test.each(dt.IncorrectPortNumber)('crossVerify/checkPortNumberRange/error', (value) => {
  const workingObject = {
    validatedOption: { quiet: false, verbose: false, port: value }
  }

  expect(co0.crossVerify(workingObject))
    .rejects
    .toThrow('Error: port must between 1 and 65535.')
})
