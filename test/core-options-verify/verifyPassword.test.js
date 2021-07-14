const cov = require('../../lib/core-options-verify')

test('verifyPassword', () => {
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

test('verifyPassword/blank', () => {
  const workingObject = {
    userOption: { password: '' },
    validatedOption: {}
  }

  expect(cov.verifyPassword(workingObject))
    .rejects
    .toThrow('Error: password is not defined.')
})
test('verifyPassword/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  expect(cov.verifyPassword(workingObject))
    .rejects
    .toThrow('Error: password is not defined.')
})
