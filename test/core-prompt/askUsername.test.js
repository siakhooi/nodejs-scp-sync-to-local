const cpr = require('../../lib/core-prompt')
const prompt = require('prompt')

test('core-prompt/askUsername/1', () => {
  const workingObject = {
    validatedOption: {
      username: 'abc'
    }
  }
  expect(cpr.askUsername(workingObject))
    .resolves
    .toEqual(workingObject)
})

test('core-prompt/askUsername/1', () => {
  const workingObject = {
    validatedOption: {
      username: null
    }
  }
  const expectedWorkingObject = {
    validatedOption: {
      username: 'cde'
    }
  }

  prompt.start = jest.fn()
  prompt.get = jest.fn().mockImplementation(() => { return Promise.resolve({ username: 'cde' }) })

  expect(cpr.askUsername(workingObject))
    .resolves
    .toEqual(expectedWorkingObject)
})
