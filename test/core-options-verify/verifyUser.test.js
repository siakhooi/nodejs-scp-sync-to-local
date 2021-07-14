const cov = require('../../lib/core-options-verify')

test('verifyUser/Good', () => {
  const workingObject = {
    userOption: { username: 'testuser' },
    validatedOption: {}
  }

  expect(cov.verifyUser(workingObject))
    .resolves
    .toMatchObject({
      userOption: {
        username: 'testuser'
      },
      validatedOption: {
        username: 'testuser'
      }
    })
})

test('verifyUser/blank', () => {
  const workingObject = {
    userOption: {
      username: ''
    },
    validatedOption: {}
  }

  expect(cov.verifyUser(workingObject))
    .rejects
    .toThrow('Error: username is not defined.')
})
test('verifyUser/undefined', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  expect(cov.verifyUser(workingObject))
    .rejects
    .toThrow('Error: username is not defined.')
})
