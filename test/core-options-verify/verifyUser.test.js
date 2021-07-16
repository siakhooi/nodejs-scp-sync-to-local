const cov = require('../../lib/core-options-verify')

test('verifyUser/Good', () => {
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

test.each([null, ''])('verifyUser/blank', (value) => {
  const workingObject = {
    userOption: { username: value },
    validatedOption: {}
  }

  expect(cov.verifyUser(workingObject))
    .rejects
    .toThrow('Error: username is undefined.')
})

test('verifyUser/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  expect(cov.verifyUser(workingObject))
    .rejects
    .toThrow('Error: username is undefined.')
})
