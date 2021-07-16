const coc = require('../../lib/core-options-crosscheck')

test('checkQuietAndVerbose/override', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true, verbose: true }
  }

  const consoleOutput = []
  global.console.warn = jest.fn().mockImplementation((s) => { consoleOutput.push(s) })
  const msg = 'Warn: Both quiet and verbose are set to true, verbose is ignored.'

  coc.checkQuietAndVerbose(workingObject)
    .then(() => {
      expect(console.warn).toBeCalled()
      expect(consoleOutput).toContain(msg)
    })
})

test.each([
  [true, false],
  [false, true],
  [false, false]
])('checkQuietAndVerbose', (quiet, verbose) => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: quiet, verbose: verbose }
  }

  global.console.warn = jest.fn()
  coc.checkQuietAndVerbose(workingObject)
    .then(() => {
      expect(console.warn).not.toBeCalled()
    })
})
