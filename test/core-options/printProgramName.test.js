const co0 = require('../../lib/core-options')
const conf = require('../../index.conf')
const cou = require('../../lib/core-output')
const m = require('../mocklib')
const util = require('util')

/* -- Sample Output
scp-sync-to-local 0.10.0

*/
const expectedInfo = [
  util.format('%s %s', conf.PROGRAM_NAME, conf.PROGRAM_VERSION),
  ''
]

test.each([
  [true, true],
  [false, false],
  [false, true]
])('printProgramName/No', (verbose, quiet) => {
  const workingObject = {
    validatedOption: {
      verbose: verbose,
      quiet: quiet
    }
  }

  cou.info = jest.fn()

  co0.printProgramName(workingObject).then(() => {
    expect(cou.info).not.toBeCalled()
  })
})

test.each([
  [true, false]
])('printProgramName/Yes', (verbose, quiet) => {
  const workingObject = {
    validatedOption: {
      verbose: verbose,
      quiet: quiet
    }
  }

  const i = new m.MockOutput()
  cou.info = i.fn()

  co0.printProgramName(workingObject)
    .then(() => {
      expect(i.verify(expectedInfo)).resolves.toBe(true)
    })
})

test.each([
  [true, false]
])('printProgramName/Yes', (verbose, quiet) => {
  const workingObject = {
    validatedOption: {
      verbose: verbose,
      quiet: quiet
    }
  }

  const i = new m.MockOutput()
  cou.info = i.fn()

  co0.printProgramName(workingObject)
    .then(() => {
      expect(i.verify(expectedInfo)).resolves.toBe(true)
    })
})
