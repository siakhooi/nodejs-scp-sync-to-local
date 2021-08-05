const co0 = require('../../lib/core-options')

test('verifyBasic/defaults', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  co0.verifyBasic(workingObject).then((workingObject) => {
    expect(workingObject)
      .toEqual({
        userOption: {},
        validatedOption: {
          verbose: false,
          quiet: false,
          prompt: false
        }
      })
  })
})

test('verifyBasic/all', () => {
  const workingObject = {
    userOption: {
      verbose: true,
      quiet: true,
      prompt: true
    },
    validatedOption: {}
  }
  return expect(co0.verifyBasic(workingObject))
    .resolves
    .toEqual({
      userOption: {
        verbose: true,
        quiet: true,
        prompt: true
      },
      validatedOption: {
        verbose: true,
        quiet: true,
        prompt: true
      }
    })
})
