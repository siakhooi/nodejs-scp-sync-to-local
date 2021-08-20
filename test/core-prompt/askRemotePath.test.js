const cpr = require('../../lib/core-prompt')
const prompt = require('prompt')

test('core-prompt/askRemotePath/-', () => {
  const workingObject = {
    validatedOption: {
      remotePath: 'abc'
    }
  }
  expect(cpr.askRemotePath(workingObject))
    .resolves
    .toEqual(workingObject)
})

test('core-prompt/askRemotePath/+', () => {
  const workingObject = {
    validatedOption: {
      remotePath: null
    }
  }
  const expectedWorkingObject = {
    validatedOption: {
      remotePath: 'console/Input/remote/Path'
    }
  }

  prompt.start = jest.fn()
  prompt.get = jest.fn()
    .mockResolvedValueOnce({ remotePath: 'console/Input/remote/Path' })

  expect(cpr.askRemotePath(workingObject))
    .resolves
    .toEqual(expectedWorkingObject)
})
