const cpr = require('../../lib/core-prompt')
const prompt = require('prompt')

test('core-prompt/askUsername/-', () => {
  const workingObject = {
    validatedOption: {
      username: 'abc'
    }
  }
  expect(cpr.askUsername(workingObject))
    .resolves
    .toEqual(workingObject)
})

test('core-prompt/askUsername/+', () => {
  const workingObject = {
    validatedOption: {
      username: null
    }
  }
  const expectedWorkingObject = {
    validatedOption: {
      username: 'consoleinputusername'
    }
  }

  prompt.start = jest.fn()
  prompt.get = jest.fn().mockResolvedValueOnce({ username: 'consoleinputusername' })

  expect(cpr.askUsername(workingObject))
    .resolves
    .toEqual(expectedWorkingObject)
})
