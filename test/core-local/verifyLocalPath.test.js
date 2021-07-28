const util = require('util')
const cl0 = require('../../lib/core-local')
const cuf = require('../../lib/core-util-fs')
const co0 = require('../../lib/core-output')
const m = require('../mocklib')

beforeEach(() => jest.clearAllMocks())

test('verifyLocalPath/path-exist', () => {
  const workingObject = {
    validatedOption: { localPath: './test-data/aeeeaaa2' }
  }
  jest.spyOn(cuf, 'isPathExist').mockImplementation(() => { return true })
  jest.spyOn(cuf, 'isDirectory').mockImplementation(() => { return true })

  cl0.verifyLocalPath(workingObject).then(() => {
    expect(cuf.isPathExist).toBeCalled()
    expect(cuf.isDirectory).toBeCalled()
  })
})

test('verifyLocalPath/path-not-exist/not-directory', () => {
  const workingObject = {
    validatedOption: { localPath: './test-data/aeeeaaa1' }
  }
  jest.spyOn(cuf, 'isPathExist').mockImplementation(() => { return true })
  jest.spyOn(cuf, 'isDirectory').mockImplementation(() => { return false })

  const msg = util.format('Error: localPath is exists but is not a directory. [%s]', workingObject.validatedOption.localPath)
  expect(cl0.verifyLocalPath(workingObject)).rejects.toThrow(msg)

  expect(cuf.isPathExist).toBeCalled()
  expect(cuf.isDirectory).toBeCalled()
})

test('verifyLocalPath/path-not-exist/auto-create', () => {
  const workingObject = {
    validatedOption: {
      localPath: './test-data/aeeeaaa3',
      autoCreateLocalPath: true
    }
  }
  jest.spyOn(cuf, 'isPathExist').mockImplementation(() => { return false })
  jest.spyOn(cuf, 'mkdir').mockImplementation(() => { })

  const w = new m.MockOutput()
  co0.warn = w.fn()

  const expectedWarn = [
    util.format('Warning: localPath is not exists, auto create. [%s]', workingObject.validatedOption.localPath)
  ]
  cl0.verifyLocalPath(workingObject)
    .then(() => {
      expect(w.verify(expectedWarn)).resolves.toBe(true)
      expect(cuf.isPathExist).toBeCalled()
      expect(cuf.mkdir).toBeCalled()
    })
})

test('verifyLocalPath/path-not-exist/auto-create/quiet', () => {
  const workingObject = {
    validatedOption: {
      localPath: './test-data/aeeeaaa4',
      autoCreateLocalPath: true,
      quiet: true
    }
  }
  jest.mock('../../lib/core-util')
  jest.spyOn(cuf, 'isPathExist').mockImplementation(() => { return false })
  jest.spyOn(cuf, 'mkdir').mockImplementation(() => { })

  co0.warn = jest.fn()

  cl0.verifyLocalPath(workingObject)
    .then(() => {
      expect(cuf.isPathExist).toBeCalled()
      expect(cuf.mkdir).toBeCalled()
      expect(co0.warn).not.toBeCalled()
    })
})

test('verifyLocalPath/path-not-exist/not-auto-create', () => {
  const workingObject = {
    validatedOption: {
      localPath: './test-data/aeeeaaa5',
      autoCreateLocalPath: false
    }
  }
  jest.mock('../../lib/core-util')
  jest.spyOn(cuf, 'isPathExist').mockImplementation(() => { return false })
  jest.spyOn(cuf, 'mkdir').mockImplementation(() => { })

  const msg = util.format('Error: localPath is not exists and autoCreateLocalPath is set to false. [%s]', workingObject.validatedOption.localPath)

  expect(cl0.verifyLocalPath(workingObject)).rejects.toThrow(msg)
  expect(cuf.isPathExist).toBeCalled()
  expect(cuf.mkdir).not.toBeCalled()
})
