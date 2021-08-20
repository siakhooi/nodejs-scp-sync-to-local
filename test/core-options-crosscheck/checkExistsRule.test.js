const coc = require('../../lib/core-options-crosscheck')

test('core-options-crosscheck/checkExistsRule/-', () => {
  const workingObject = {
    userOption: {},
    validatedOption: { skipIfExists: true, skipIfNotExists: true }
  }

  expect(coc.checkExistsRule(workingObject))
    .rejects
    .toThrow('Error: skipIfExists and skipIfNotExists are mutually exclusive.')
})

test.each([
  [true, false],
  [false, true],
  [false, false]
])('core-options-crosscheck/checkExistsRule/+', (exist, notExist) => {
  const workingObject = {
    userOption: {},
    validatedOption: { skipIfExists: exist, skipIfNotExists: notExist }
  }

  expect(coc.checkExistsRule(workingObject))
    .resolves
    .toMatchObject(workingObject)
})
