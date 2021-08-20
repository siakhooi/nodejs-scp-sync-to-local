const cov = require('../../lib/core-options-verify')
const dt = require('../mock-data/common-data-sets')

test('core-options-verify/verifyPassword/+', () => {
  const workingObject = {
    userOption: { password: 'testpassword' },
    validatedOption: {}
  }

  expect(cov.verifyPassword(workingObject))
    .resolves
    .toMatchObject({
      userOption: { password: 'testpassword' },
      validatedOption: { password: 'testpassword' }
    })
})

test.each(dt.BlankValueDataSet)('core-options-verify/verifyPassword/BlankValueDataSet', (value) => {
  const workingObject = {
    userOption: { password: value },
    validatedOption: {}
  }

  expect(cov.verifyPassword(workingObject))
    .rejects
    .toThrow('Error: password is undefined.')
})
test('core-options-verify/verifyPassword/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  expect(cov.verifyPassword(workingObject))
    .rejects
    .toThrow('Error: password is undefined.')
})
test.each(dt.BlankValueDataSet)('core-options-verify/verifyPassword/BlankValueDataSet/prompt', (value) => {
  const workingObject = {
    userOption: { password: value, prompt: true },
    validatedOption: { prompt: true }
  }

  const expectWorkingObject = {
    userOption: { password: value, prompt: true },
    validatedOption: { prompt: true, password: null }
  }

  expect(cov.verifyPassword(workingObject))
    .resolves
    .toEqual(expectWorkingObject)
})

test('core-options-verify/verifyPassword/undefined/prompt', () => {
  const workingObject = {
    userOption: { prompt: true },
    validatedOption: { prompt: true }
  }
  const expectWorkingObject = {
    userOption: { prompt: true },
    validatedOption: { prompt: true, password: null }
  }
  expect(cov.verifyPassword(workingObject))
    .resolves
    .toEqual(expectWorkingObject)
})
