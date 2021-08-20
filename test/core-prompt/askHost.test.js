const cpr = require('../../lib/core-prompt')
const prompt = require('prompt')

test('core-prompt/askHost/-', () => {
  const workingObject = {
    validatedOption: {
      host: 'abc'
    }
  }
  expect(cpr.askHost(workingObject))
    .resolves
    .toEqual(workingObject)
})

test('core-prompt/askHost/+', () => {
  const workingObject = {
    validatedOption: {
      host: null
    }
  }
  const expectedWorkingObject = {
    validatedOption: {
      host: 'consoleinputhost'
    }
  }

  prompt.start = jest.fn()
  prompt.get = jest.fn()
    .mockResolvedValueOnce({ host: 'consoleinputhost' })

  expect(cpr.askHost(workingObject))
    .resolves
    .toEqual(expectedWorkingObject)
})
