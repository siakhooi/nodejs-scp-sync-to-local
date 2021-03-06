const cov = require('../../lib/core-options-verify')
const dt = require('../mock-data/common-data-sets')

test('core-options-verify/verifyUser/+', () => {
  const workingObject = {
    userOption: { username: 'testuser' },
    validatedOption: {}
  }

  expect(cov.verifyUser(workingObject))
    .resolves
    .toMatchObject({
      userOption: { username: 'testuser' },
      validatedOption: { username: 'testuser' }
    })
})

test.each(dt.BlankValueDataSet)('core-options-verify/verifyUser/BlankValueDataSet', (value) => {
  const workingObject = {
    userOption: { username: value },
    validatedOption: {}
  }

  expect(cov.verifyUser(workingObject))
    .rejects
    .toThrow('Error: username is undefined.')
})

test('core-options-verify/verifyUser/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  expect(cov.verifyUser(workingObject))
    .rejects
    .toThrow('Error: username is undefined.')
})
test('core-options-verify/verifyUser/undefined/prompt', () => {
  const workingObject = {
    userOption: { prompt: true },
    validatedOption: { prompt: true }
  }
  const expectWorkingObject = {
    userOption: { prompt: true },
    validatedOption: { prompt: true, username: null }
  }

  expect(cov.verifyUser(workingObject))
    .resolves
    .toEqual(expectWorkingObject)
})
test.each(dt.BlankValueDataSet)('core-options-verify/verifyUser/BlankValueDataSet/prompt', (value) => {
  const workingObject = {
    userOption: { username: value, prompt: true },
    validatedOption: { prompt: true }
  }
  const expectWorkingObject = {
    userOption: { prompt: true, username: value },
    validatedOption: { prompt: true, username: null }
  }

  expect(cov.verifyUser(workingObject))
    .resolves
    .toEqual(expectWorkingObject)
})
