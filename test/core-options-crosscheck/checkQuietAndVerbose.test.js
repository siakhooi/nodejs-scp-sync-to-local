const coc = require('../../lib/core-options-crosscheck')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')

test('core-options-crosscheck/checkQuietAndVerbose/override', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet: true, verbose: true }
  }

  const w = new m.MockOutput()
  co0.warn = w.fn()

  const expectedWarn = ['Warn: Both quiet and verbose are set to true, verbose is ignored.']

  coc.checkQuietAndVerbose(workingObject)
    .then(() => {
      expect(w.verify(expectedWarn)).resolves.toBe(true)
    })
})

test.each([
  [true, false],
  [false, true],
  [false, false]
])('core-options-crosscheck/checkQuietAndVerbose/-', (quiet, verbose) => {
  const workingObject = {
    userOption: {},
    validatedOption: { quiet, verbose }
  }

  co0.warn = jest.fn()
  coc.checkQuietAndVerbose(workingObject)
    .then(() => {
      expect(co0.warn).not.toBeCalled()
    })
})
