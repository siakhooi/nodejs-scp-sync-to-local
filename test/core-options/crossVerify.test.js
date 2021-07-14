const co0 = require('../../lib/core-options')

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

  global.console.warn = jest.fn()
  co0.crossVerify(workingObject)
    .then(() => {
      expect(console.warn).not.toBeCalled()
    })
})

test('crossVerify/checkQuietAndVerbose/override', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true, verbose: true }
  }

  const consoleOutput = []
  global.console.warn = jest.fn().mockImplementation((s) => { consoleOutput.push(s) })
  const msg = 'Warn: Both quiet and verbose set to true, verbose is ignored.'

  co0.crossVerify(workingObject).then((workingObject) => {
    expect(console.warn).toBeCalled()
    expect(consoleOutput).toContain(msg)
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

  global.console.warn = jest.fn()
  co0.crossVerify(workingObject).then((workingObject) => {
    expect(console.warn).not.toBeCalled()
  })
})
