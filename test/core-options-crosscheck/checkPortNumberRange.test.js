const coc = require('../../lib/core-options-crosscheck')
const dt = require('../mock-data/common-data-sets')

test.each(dt.IncorrectPortNumber)('core-options-crosscheck/checkPortNumberRange/IncorrectPortNumber', (value) => {
  const workingObject = {
    validatedOption: { port: value }
  }

  expect(coc.checkPortNumberRange(workingObject))
    .rejects
    .toThrow('Error: port must between 1 and 65535.')
})

test.each(dt.CorrectPortNumber)('core-options-crosscheck/checkPortNumberRange/CorrectPortNumber', (value) => {
  const workingObject = {
    validatedOption: { port: value }
  }

  expect(coc.checkPortNumberRange(workingObject))
    .resolves
    .toMatchObject(workingObject)
})
