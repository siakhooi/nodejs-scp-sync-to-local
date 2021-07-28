const co0 = require('../../lib/core-options')
const cou = require('../../lib/core-output')
const m = require('../mocklib')

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
