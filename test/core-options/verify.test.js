const co0 = require('../../lib/core-options')
const cou = require('../../lib/core-output')
const m = require('../mocklib')

test('verify/defaults', () => {
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
    'Warning: skipIfExists is undefined, defaulting to false.',
    'Warning: skipIfNotExists is undefined, defaulting to false.',
    'Warning: skipIfNewer is undefined, defaulting to false.',
    'Warning: skipIfOlder is undefined, defaulting to false.',
    'Warning: skipIfSameAge is undefined, defaulting to false.',
    'Warning: skipIfBigger is undefined, defaulting to false.',
    'Warning: skipIfSmaller is undefined, defaulting to false.',
    'Warning: skipIfSameSize is undefined, defaulting to false.',
    'Warning: remotePath is undefined, defaulting to current directory. [.]',
    'Warning: localPath is undefined, defaulting to current directory. [.]'
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

test('verify/all', () => {
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
