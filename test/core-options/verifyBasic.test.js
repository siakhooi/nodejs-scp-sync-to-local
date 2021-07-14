const co0 = require('../../lib/core-options')

test('verifyBasic/defaults', () => {
  const workingObject = {
    userOption: {},
    validatedOption: {}
  }

  co0.verifyBasic(workingObject).then((workingObject) => {
    expect(workingObject)
      .toMatchObject({
        validatedOption: {
          verbose: false,
          quiet: false
        }
      })
  })
})

test('verifyBasic/all', () => {
  const workingObject = {
    userOption: {
      verbose: true,
      quiet: true
    },
    validatedOption: {}
  }
  return expect(co0.verifyBasic(workingObject))
    .resolves
    .toMatchObject({
      validatedOption: {
        verbose: true,
        quiet: true
      }
    })
})
