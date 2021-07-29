const co0 = require('../../lib/core-options')
const conf = require('../../index.conf')
const cou = require('../../lib/core-output')
const m = require('../mocklib')
const util = require('util')

/* -- Sample Output
[Parameters)
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
         postProcessing: Yes
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

  cou.info = jest.fn()

  co0.print(workingObject).then(() => {
    expect(cou.info).not.toBeCalled()
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
      postProcessing: () => { },
      verbose: verbose,
      quiet: quiet
    }
  }

  const expectedInfo = [
    util.format('[Parameters]'),
    util.format('               host: %s', 'localhost'),
    util.format('               port: %d', 22),
    util.format('           username: %s', 'testuser'),
    util.format('           password: %s', conf.PASSWORD_MASK),
    util.format('         remotePath: %s', '/home/testuser/data'),
    util.format('          localPath: %s', './test-data'),
    util.format('       skipIfExists: %s', false),
    util.format('    skipIfNotExists: %s', false),
    util.format('        skipIfNewer: %s', false),
    util.format('        skipIfOlder: %s', false),
    util.format('      skipIfSameAge: %s', false),
    util.format('       skipIfBigger: %s', false),
    util.format('      skipIfSmaller: %s', false),
    util.format('     skipIfSameSize: %s', false),
    util.format('autoCreateLocalPath: %s', true),
    util.format('      keepTimestamp: %s', false),
    util.format('       customFilter: %s', 'Yes'),
    util.format('     postProcessing: %s', 'Yes'),
    util.format('            verbose: %s', verbose),
    util.format('              quiet: %s', quiet)
  ]

  const i = new m.MockOutput()
  cou.info = i.fn()

  co0.print(workingObject).then(() => {
    expect(i.verify(expectedInfo)).resolves.toBe(true)
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
      postProcessing: null,
      verbose: verbose,
      quiet: quiet
    }
  }

  const expectedInfo = [
    util.format('[Parameters]'),
    util.format('               host: %s', 'localhost'),
    util.format('               port: %d', 22),
    util.format('           username: %s', 'testuser'),
    util.format('           password: %s', conf.PASSWORD_MASK),
    util.format('         remotePath: %s', '/home/testuser/data'),
    util.format('          localPath: %s', './test-data'),
    util.format('       skipIfExists: %s', false),
    util.format('    skipIfNotExists: %s', false),
    util.format('        skipIfNewer: %s', false),
    util.format('        skipIfOlder: %s', false),
    util.format('      skipIfSameAge: %s', false),
    util.format('       skipIfBigger: %s', false),
    util.format('      skipIfSmaller: %s', false),
    util.format('     skipIfSameSize: %s', false),
    util.format('autoCreateLocalPath: %s', true),
    util.format('      keepTimestamp: %s', false),
    util.format('       customFilter: %s', 'No'),
    util.format('     postProcessing: %s', 'No'),
    util.format('            verbose: %s', verbose),
    util.format('              quiet: %s', quiet)
  ]

  const i = new m.MockOutput()
  cou.info = i.fn()

  co0.print(workingObject)
    .then(() => {
      expect(i.verify(expectedInfo)).resolves.toBe(true)
    })
})
