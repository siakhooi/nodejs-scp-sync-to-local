const co0 = require('../../lib/core-options')
const cou = require('../../lib/core-output')
const m = require('../mocklib')
const dt = require('../mock-data/common-data-sets')

test('core-options/crossVerify/checkExistsRule/-', () => {
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
])('core-options/crossVerify/checkExistsRule/+', (exist, notExist) => {
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

test('core-options/crossVerify/checkQuietAndVerbose/override', () => {
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
])('core-options/crossVerify/checkQuietAndVerbose/+', (quiet, verbose) => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet, verbose }
  }

  cou.warn = jest.fn()
  co0.crossVerify(workingObject).then(() => {
    expect(cou.warn).not.toBeCalled()
  })
})

test.each(dt.CorrectPortNumber)('core-options/crossVerify/checkPortNumberRange/CorrectPortNumber', (value) => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: false, verbose: false, port: value }
  }

  cou.warn = jest.fn()
  co0.crossVerify(workingObject).then(() => {
    expect(cou.warn).not.toBeCalled()
  })
})
test.each(dt.IncorrectPortNumber)('core-options/crossVerify/checkPortNumberRange/IncorrectPortNumber', (value) => {
  const workingObject = {
    validatedOption: { quiet: false, verbose: false, port: value }
  }

  expect(co0.crossVerify(workingObject))
    .rejects
    .toThrow('Error: port must between 1 and 65535.')
})
