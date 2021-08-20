const co0 = require('../../lib/core-options')
const cou = require('../../lib/core-output')
const m = require('../mocklib')
const prompt = require('prompt')

test('core-options/verify/defaults', () => {
  const workingObject = {
    userOption: {
      username: 'testuser',
      password: 'testpassword'
    },
    validatedOption: {}
  }
  const i = new m.MockOutput()
  cou.info = i.fn()

  const w = new m.MockOutput()
  cou.warn = w.fn()

  const expectedWarn = [
    'Warning: host is undefined, defaulting to localhost.',
    'Warning: localPath is undefined, defaulting to current directory. [.]',
    'Warning: remotePath is undefined, defaulting to current directory. [.]',
    'Warning: skipIfExists is undefined, defaulting to false.',
    'Warning: skipIfNotExists is undefined, defaulting to false.',
    'Warning: skipIfNewer is undefined, defaulting to false.',
    'Warning: skipIfOlder is undefined, defaulting to false.',
    'Warning: skipIfSameAge is undefined, defaulting to false.',
    'Warning: skipIfBigger is undefined, defaulting to false.',
    'Warning: skipIfSmaller is undefined, defaulting to false.',
    'Warning: skipIfSameSize is undefined, defaulting to false.'
  ]
  const expectedInfo = ['Info: port is undefined, defaulting to 22.']

  co0.verify(workingObject).then((workingObject) => {
    expect(workingObject)
      .toMatchObject({
        validatedOption: {
          host: 'localhost',
          username: 'testuser',
          password: 'testpassword',
          remotePath: '.',
          localPath: '.',
          port: 22,
          skipIfExists: false,
          skipIfNotExists: false,
          skipIfNewer: false,
          skipIfOlder: false,
          skipIfSameAge: false,
          skipIfBigger: false,
          skipIfSmaller: false,
          skipIfSameSize: false,
          autoCreateLocalPath: true,
          keepTimestamp: false
        }
      })
    expect(i.verify(expectedInfo)).resolves.toBe(true)
    expect(w.verify(expectedWarn)).resolves.toBe(true)
  })
})

test('core-options/verify/all', () => {
  const dummyFunction = () => { }
  const workingObject = {
    userOption: {
      host: 'xxxxx',
      username: 'testuser',
      password: 'testpassword',
      remotePath: '/home/testuser/test-data/',
      localPath: './test-data/',
      port: 2222,
      skipIfExists: false,
      skipIfNotExists: true,
      skipIfNewer: true,
      skipIfOlder: true,
      skipIfSameAge: true,
      skipIfBigger: true,
      skipIfSmaller: true,
      skipIfSameSize: true,
      autoCreateLocalPath: false,
      keepTimestamp: true,
      customFilter: dummyFunction,
      postProcessing: dummyFunction,
      postProcessingOptions: { x: 3 }
    },
    validatedOption: {}
  }
  return expect(co0.verify(workingObject))
    .resolves
    .toMatchObject({
      validatedOption: {
        host: 'xxxxx',
        username: 'testuser',
        password: 'testpassword',
        remotePath: '/home/testuser/test-data/',
        localPath: './test-data/',
        port: 2222,
        skipIfExists: false,
        skipIfNotExists: true,
        skipIfNewer: true,
        skipIfOlder: true,
        skipIfSameAge: true,
        skipIfBigger: true,
        skipIfSmaller: true,
        skipIfSameSize: true,
        autoCreateLocalPath: false,
        keepTimestamp: true,
        customFilter: dummyFunction,
        postProcessing: dummyFunction,
        postProcessingOptions: { x: 3 }
      }
    })
})
test('core-options/verify/prompt/username', () => {
  const dummyFunction = () => { }
  const workingObject = {
    userOption: {
      host: 'xxxxx',
      password: 'testpassword',
      remotePath: '/home/testuser/test-data/',
      localPath: './test-data/',
      port: 2222,
      skipIfExists: false,
      skipIfNotExists: true,
      skipIfNewer: true,
      skipIfOlder: true,
      skipIfSameAge: true,
      skipIfBigger: true,
      skipIfSmaller: true,
      skipIfSameSize: true,
      autoCreateLocalPath: false,
      keepTimestamp: true,
      customFilter: dummyFunction,
      postProcessing: dummyFunction,
      postProcessingOptions: { x: 3 },
      prompt: true

    },
    validatedOption: { prompt: true }
  }
  prompt.start = jest.fn()
  prompt.get = jest.fn().mockResolvedValueOnce({ username: 'consoleinputusername' })

  return expect(co0.verify(workingObject))
    .resolves
    .toMatchObject({
      validatedOption: {
        host: 'xxxxx',
        username: 'consoleinputusername',
        password: 'testpassword',
        remotePath: '/home/testuser/test-data/',
        localPath: './test-data/',
        port: 2222,
        skipIfExists: false,
        skipIfNotExists: true,
        skipIfNewer: true,
        skipIfOlder: true,
        skipIfSameAge: true,
        skipIfBigger: true,
        skipIfSmaller: true,
        skipIfSameSize: true,
        autoCreateLocalPath: false,
        keepTimestamp: true,
        customFilter: dummyFunction,
        postProcessing: dummyFunction,
        postProcessingOptions: { x: 3 },
        prompt: true
      }
    })
})

test('core-options/verify/prompt/password', () => {
  const dummyFunction = () => { }
  const workingObject = {
    userOption: {
      host: 'xxxxx',
      username: 'testusername',
      remotePath: '/home/testuser/test-data/',
      localPath: './test-data/',
      port: 2222,
      skipIfExists: false,
      skipIfNotExists: true,
      skipIfNewer: true,
      skipIfOlder: true,
      skipIfSameAge: true,
      skipIfBigger: true,
      skipIfSmaller: true,
      skipIfSameSize: true,
      autoCreateLocalPath: false,
      keepTimestamp: true,
      customFilter: dummyFunction,
      postProcessing: dummyFunction,
      postProcessingOptions: { x: 3 },
      prompt: true

    },
    validatedOption: { prompt: true }
  }
  prompt.start = jest.fn()
  prompt.get = jest.fn().mockResolvedValueOnce({ password: 'consoleinputpassword' })

  return expect(co0.verify(workingObject))
    .resolves
    .toMatchObject({
      validatedOption: {
        host: 'xxxxx',
        username: 'testusername',
        password: 'consoleinputpassword',
        remotePath: '/home/testuser/test-data/',
        localPath: './test-data/',
        port: 2222,
        skipIfExists: false,
        skipIfNotExists: true,
        skipIfNewer: true,
        skipIfOlder: true,
        skipIfSameAge: true,
        skipIfBigger: true,
        skipIfSmaller: true,
        skipIfSameSize: true,
        autoCreateLocalPath: false,
        keepTimestamp: true,
        customFilter: dummyFunction,
        postProcessing: dummyFunction,
        postProcessingOptions: { x: 3 },
        prompt: true
      }
    })
})

test('core-options/verify/prompt/host', () => {
  const dummyFunction = () => { }
  const workingObject = {
    userOption: {
      username: 'testusername',
      password: 'testpassword',
      remotePath: '/home/testuser/test-data/',
      localPath: './test-data/',
      port: 2222,
      skipIfExists: false,
      skipIfNotExists: true,
      skipIfNewer: true,
      skipIfOlder: true,
      skipIfSameAge: true,
      skipIfBigger: true,
      skipIfSmaller: true,
      skipIfSameSize: true,
      autoCreateLocalPath: false,
      keepTimestamp: true,
      customFilter: dummyFunction,
      postProcessing: dummyFunction,
      postProcessingOptions: { x: 3 },
      prompt: true

    },
    validatedOption: { prompt: true }
  }
  prompt.start = jest.fn()
  prompt.get = jest.fn().mockResolvedValueOnce({ host: 'consoleinputhost' })

  return expect(co0.verify(workingObject))
    .resolves
    .toMatchObject({
      validatedOption: {
        host: 'consoleinputhost',
        username: 'testusername',
        password: 'testpassword',
        remotePath: '/home/testuser/test-data/',
        localPath: './test-data/',
        port: 2222,
        skipIfExists: false,
        skipIfNotExists: true,
        skipIfNewer: true,
        skipIfOlder: true,
        skipIfSameAge: true,
        skipIfBigger: true,
        skipIfSmaller: true,
        skipIfSameSize: true,
        autoCreateLocalPath: false,
        keepTimestamp: true,
        customFilter: dummyFunction,
        postProcessing: dummyFunction,
        postProcessingOptions: { x: 3 },
        prompt: true
      }
    })
})

test('core-options/verify/prompt/localPath', () => {
  const dummyFunction = () => { }
  const workingObject = {
    userOption: {
      username: 'testusername',
      password: 'testpassword',
      remotePath: '/home/testuser/test-data/',
      host: 'host123',
      port: 2222,
      skipIfExists: false,
      skipIfNotExists: true,
      skipIfNewer: true,
      skipIfOlder: true,
      skipIfSameAge: true,
      skipIfBigger: true,
      skipIfSmaller: true,
      skipIfSameSize: true,
      autoCreateLocalPath: false,
      keepTimestamp: true,
      customFilter: dummyFunction,
      postProcessing: dummyFunction,
      postProcessingOptions: { x: 3 },
      prompt: true

    },
    validatedOption: { prompt: true }
  }
  prompt.start = jest.fn()
  prompt.get = jest.fn().mockResolvedValueOnce({ localPath: 'console/input/local/Path' })

  return expect(co0.verify(workingObject))
    .resolves
    .toMatchObject({
      validatedOption: {
        host: 'host123',
        username: 'testusername',
        password: 'testpassword',
        remotePath: '/home/testuser/test-data/',
        localPath: 'console/input/local/Path',
        port: 2222,
        skipIfExists: false,
        skipIfNotExists: true,
        skipIfNewer: true,
        skipIfOlder: true,
        skipIfSameAge: true,
        skipIfBigger: true,
        skipIfSmaller: true,
        skipIfSameSize: true,
        autoCreateLocalPath: false,
        keepTimestamp: true,
        customFilter: dummyFunction,
        postProcessing: dummyFunction,
        postProcessingOptions: { x: 3 },
        prompt: true
      }
    })
})

test('core-options/verify/prompt/remotePath', () => {
  const dummyFunction = () => { }
  const workingObject = {
    userOption: {
      username: 'testusername',
      password: 'testpassword',
      localPath: './test-data/',
      host: 'host123',
      port: 2222,
      skipIfExists: false,
      skipIfNotExists: true,
      skipIfNewer: true,
      skipIfOlder: true,
      skipIfSameAge: true,
      skipIfBigger: true,
      skipIfSmaller: true,
      skipIfSameSize: true,
      autoCreateLocalPath: false,
      keepTimestamp: true,
      customFilter: dummyFunction,
      postProcessing: dummyFunction,
      postProcessingOptions: { x: 3 },
      prompt: true

    },
    validatedOption: { prompt: true }
  }
  prompt.start = jest.fn()
  prompt.get = jest.fn().mockResolvedValueOnce({ remotePath: 'console/input/remote/Path' })

  return expect(co0.verify(workingObject))
    .resolves
    .toMatchObject({
      validatedOption: {
        host: 'host123',
        username: 'testusername',
        password: 'testpassword',
        remotePath: 'console/input/remote/Path',
        localPath: './test-data/',
        port: 2222,
        skipIfExists: false,
        skipIfNotExists: true,
        skipIfNewer: true,
        skipIfOlder: true,
        skipIfSameAge: true,
        skipIfBigger: true,
        skipIfSmaller: true,
        skipIfSameSize: true,
        autoCreateLocalPath: false,
        keepTimestamp: true,
        customFilter: dummyFunction,
        postProcessing: dummyFunction,
        postProcessingOptions: { x: 3 },
        prompt: true
      }
    })
})
