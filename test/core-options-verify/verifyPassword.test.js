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

test.each([null, ''])('verifyPassword/blank', (value) => {
  const workingObject = {
    userOption: { password: value },
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
