const cpr = require('../../lib/core-prompt')
const prompt = require('prompt')

test('core-prompt/askLocalPath/0', () => {
  const workingObject = {
    validatedOption: {
      localPath: 'abc'
    }
  }
  expect(cpr.askLocalPath(workingObject))
    .resolves
    .toEqual(workingObject)
})

test('core-prompt/askLocalPath/1', () => {
  const workingObject = {
    validatedOption: {
      localPath: null
    }
  }
  const expectedWorkingObject = {
    validatedOption: {
      localPath: 'console/Input/local/Path'
    }
  }

  prompt.start = jest.fn()
  prompt.get = jest.fn()
    .mockResolvedValueOnce({ localPath: 'console/Input/local/Path' })

  expect(cpr.askLocalPath(workingObject))
    .resolves
    .toEqual(expectedWorkingObject)
})
