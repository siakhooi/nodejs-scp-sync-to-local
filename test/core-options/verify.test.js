const co0 = require('../../lib/core-options')

test('verify/defaults', () => {
  const workingObject = {
    userOption: {
      username: 'testuser',
      password: 'testpassword'
    },
    validatedOption: {}
  }
  const warnOutput = []; const infoOutput = []
  console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s) })
  console.info = jest.fn().mockImplementation((s) => { infoOutput.push(s) })
  const warnMsg = [
    'Warning: host undefined, defaulting to localhost.',
    'Warning: skipIfExists undefined, defaulting to false.',
    'Warning: skipIfNotExists undefined, defaulting to false.',
    'Warning: skipIfNewer undefined, defaulting to false.',
    'Warning: skipIfOlder undefined, defaulting to false.',
    'Warning: skipIfSameAge undefined, defaulting to false.',
    'Warning: skipIfBigger undefined, defaulting to false.',
    'Warning: skipIfSmaller undefined, defaulting to false.',
    'Warning: skipIfSameSize undefined, defaulting to false.',
    'Warning: remotePath undefined, defaulting to current directory. [.]',
    'Warning: localPath undefined, defaulting to current directory. [.]'
  ]
  const infoMsg = ['Info: port undefined, defaulting to 22.']

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
    expect(console.warn).toBeCalled()
    expect(console.info).toBeCalled()
    warnOutput.forEach((x) => expect(warnMsg).toContainEqual(x))
    warnMsg.forEach((x) => expect(warnOutput).toContainEqual(x))
    infoOutput.forEach((x) => expect(infoMsg).toContainEqual(x))
    infoMsg.forEach((x) => expect(infoOutput).toContainEqual(x))
  })
})

test('verify/all', () => {
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
      keepTimestamp: true
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
        keepTimestamp: true
      }
    })
})
