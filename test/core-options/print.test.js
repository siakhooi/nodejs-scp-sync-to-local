const co0 = require('../../lib/core-options')
const conf = require('../../index.conf')

/* -- Sample Output
[Parameters]
                   host: 192.168.0.106
                   port: 22
               username: testuser
               password: **********
             remotePath: /home/testuser/data
              localPath: ./test-data
           skipIfExists: false
        skipIfNotExists: false
            skipIfNewer: false
            skipIfOlder: false
          skipIfSameAge: false
           skipIfBigger: false
          skipIfSmaller: false
         skipIfSameSize: false
    autoCreateLocalPath: true
          keepTimestamp: false
           customFilter: Yes
                verbose: true
                  quiet: false
*/

test.each([
  [true, true],
  [false, false],
  [false, true]
])('print/No', (verbose, quiet) => {
  const workingObject = {
    validatedOption: {
      host: 'localhost',
      username: 'testuser',
      password: 'testpassword',
      remotePath: '/home/testuser/data',
      localPath: './test-data',
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
      keepTimestamp: false,
      verbose: verbose,
      quiet: quiet
    }
  }

  global.console.log = jest.fn()

  co0.print(workingObject).then(() => {
    expect(console.log).not.toBeCalled()
  })
})

test.each([
  [true, false]
])('print/Yes', (verbose, quiet) => {
  const workingObject = {
    validatedOption: {
      host: 'localhost',
      username: 'testuser',
      password: 'testpassword',
      remotePath: '/home/testuser/data',
      localPath: './test-data',
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
      keepTimestamp: false,
      customFilter: () => { },
      verbose: verbose,
      quiet: quiet
    }
  }

  const logValues = [
    ['[Parameters]', undefined, undefined],
    ['               host: %s', 'localhost', undefined],
    ['               port: %d', 22, undefined],
    ['           username: %s', 'testuser', undefined],
    ['           password: %s', conf.PASSWORD_MASK, undefined],
    ['         remotePath: %s', '/home/testuser/data', undefined],
    ['          localPath: %s', './test-data', undefined],
    ['       skipIfExists: %s', false, undefined],
    ['    skipIfNotExists: %s', false, undefined],
    ['        skipIfNewer: %s', false, undefined],
    ['        skipIfOlder: %s', false, undefined],
    ['      skipIfSameAge: %s', false, undefined],
    ['       skipIfBigger: %s', false, undefined],
    ['      skipIfSmaller: %s', false, undefined],
    ['     skipIfSameSize: %s', false, undefined],
    ['autoCreateLocalPath: %s', true, undefined],
    ['      keepTimestamp: %s', false, undefined],
    ['       customFilter: %s', 'Yes', undefined],
    ['            verbose: %s', verbose, undefined],
    ['              quiet: %s', quiet, undefined]
  ]

  const logOutput = []
  global.console.log = jest.fn().mockImplementation((s, i, j) => { logOutput.push([s, i, j]) })

  co0.print(workingObject).then(() => {
    expect(console.log).toBeCalled()
    logValues.forEach((x) => expect(logOutput).toContainEqual(x))
    logOutput.forEach((x) => expect(logValues).toContainEqual(x))
  })
})

test.each([
  [true, false]
])('print/Yes', (verbose, quiet) => {
  const workingObject = {
    validatedOption: {
      host: 'localhost',
      username: 'testuser',
      password: 'testpassword',
      remotePath: '/home/testuser/data',
      localPath: './test-data',
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
      keepTimestamp: false,
      customFilter: null,
      verbose: verbose,
      quiet: quiet
    }
  }

  const logValues = [
    ['[Parameters]', undefined, undefined],
    ['               host: %s', 'localhost', undefined],
    ['               port: %d', 22, undefined],
    ['           username: %s', 'testuser', undefined],
    ['           password: %s', conf.PASSWORD_MASK, undefined],
    ['         remotePath: %s', '/home/testuser/data', undefined],
    ['          localPath: %s', './test-data', undefined],
    ['       skipIfExists: %s', false, undefined],
    ['    skipIfNotExists: %s', false, undefined],
    ['        skipIfNewer: %s', false, undefined],
    ['        skipIfOlder: %s', false, undefined],
    ['      skipIfSameAge: %s', false, undefined],
    ['       skipIfBigger: %s', false, undefined],
    ['      skipIfSmaller: %s', false, undefined],
    ['     skipIfSameSize: %s', false, undefined],
    ['autoCreateLocalPath: %s', true, undefined],
    ['      keepTimestamp: %s', false, undefined],
    ['       customFilter: %s', 'No', undefined],
    ['            verbose: %s', verbose, undefined],
    ['              quiet: %s', quiet, undefined]
  ]

  const logOutput = []
  global.console.log = jest.fn().mockImplementation((s, i, j) => { logOutput.push([s, i, j]) })

  co0.print(workingObject)
    .then(() => {
      expect(console.log).toBeCalled()
      logValues.forEach((x) => expect(logOutput).toContainEqual(x))
      logOutput.forEach((x) => expect(logValues).toContainEqual(x))
    })
})
