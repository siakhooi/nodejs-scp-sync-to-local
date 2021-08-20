const cpr = require('../../lib/core-prompt')
const prompt = require('prompt')

test('core-prompt/askPassword/-', () => {
  const workingObject = {
    validatedOption: {
      password: 'abc'
    }
  }
  expect(cpr.askPassword(workingObject))
    .resolves
    .toEqual(workingObject)
})

test('core-prompt/askPassword/+', () => {
  const workingObject = {
    validatedOption: {
      password: null
    }
  }
  const expectedWorkingObject = {
    validatedOption: {
      password: 'consoleinputpassword'
    }
  }

  prompt.start = jest.fn()
  prompt.get = jest.fn()
    .mockResolvedValueOnce({ password: 'consoleinputpassword' })

  expect(cpr.askPassword(workingObject))
    .resolves
    .toEqual(expectedWorkingObject)
})
