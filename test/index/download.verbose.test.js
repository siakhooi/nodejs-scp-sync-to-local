const scp = require('../../index')
const path = require('path')
const cuf = require('../../lib/core-util-fs')
const cou = require('../../lib/core-output')
const m = require('../mocklib')
const conf = require('../../index.conf')
const util = require('util')

const i = new m.MockOutput()
cou.info = i.fn()
const w = new m.MockOutput()
cou.warn = w.fn()
const p = new m.MockOutput()
cou.print = p.fn()

beforeEach(() => {
  i.clear()
  w.clear()
  p.clear()
})

test('scp/download/verbose/1', () => {
  const expectedInfo = [
    util.format('%s %s', conf.PROGRAM_NAME, conf.PROGRAM_VERSION),
    '',
    'Info: port is undefined, defaulting to 22.',
    util.format('[Parameters]'),
    util.format('                 host: %s', '1.0.0.0'),
    util.format('                 port: %d', 22),
    util.format('             username: %s', 'testuser'),
    util.format('             password: %s', conf.PASSWORD_MASK),
    util.format('           remotePath: %s', '/home/testuser/data'),
    util.format('            localPath: %s', './test-data1'),
    util.format('         skipIfExists: %s', false),
    util.format('      skipIfNotExists: %s', false),
    util.format('          skipIfNewer: %s', false),
    util.format('          skipIfOlder: %s', false),
    util.format('        skipIfSameAge: %s', false),
    util.format('         skipIfBigger: %s', false),
    util.format('        skipIfSmaller: %s', false),
    util.format('       skipIfSameSize: %s', false),
    util.format('  autoCreateLocalPath: %s', true),
    util.format('         customFilter: %s', 'No'),
    util.format('       postProcessing: %s', 'No'),
    util.format('postProcessingOptions: %s', '{}'),
    util.format('        keepTimestamp: %s', false),
    util.format('               prompt: %s', false),
    util.format('              verbose: %s', true),
    util.format('                quiet: %s', false),
    'done',
    '1 downloading /home/testuser/data/Mock_File_1.zip',
    '2 downloading /home/testuser/data/Mock_File_2.zip',
    '1 downloaded /home/testuser/data/Mock_File_1.zip ' + path.normalize('./test-data1/Mock_File_1.zip') + ' 2928',
    '2 downloaded /home/testuser/data/Mock_File_2.zip ' + path.normalize('./test-data1/Mock_File_2.zip') + ' 49453',
    'All done, total downloads = 2.']

  const expectedWarn = [
    'Warning: skipIfExists is undefined, defaulting to false.',
    'Warning: skipIfNotExists is undefined, defaulting to false.',
    'Warning: skipIfNewer is undefined, defaulting to false.',
    'Warning: skipIfOlder is undefined, defaulting to false.',
    'Warning: skipIfSameAge is undefined, defaulting to false.',
    'Warning: skipIfBigger is undefined, defaulting to false.',
    'Warning: skipIfSmaller is undefined, defaulting to false.',
    'Warning: skipIfSameSize is undefined, defaulting to false.',
    'Warning: localPath is not exists, auto create. [./test-data1]']

  const expectedPrint = ['Downloading Remote File List...']

  cuf.mkdir = jest.fn()

  const option = {
    host: '1.0.0.0',
    username: 'testuser',
    password: 'testpassord',
    remotePath: '/home/testuser/data',
    verbose: true,
    localPath: './test-data1'
  }

  return scp.download(option)
    .then(() => {
      expect(i.verify(expectedInfo)).resolves.toBe(true)
      expect(w.verify(expectedWarn)).resolves.toBe(true)
      expect(p.verify(expectedPrint)).resolves.toBe(true)
    })
})

test('scp/download/verbose/2', () => {
  const expectedInfo = [
    util.format('%s %s', conf.PROGRAM_NAME, conf.PROGRAM_VERSION),
    '',
    util.format('[Parameters]'),
    util.format('                 host: %s', '1.0.0.0'),
    util.format('                 port: %d', 23),
    util.format('             username: %s', 'testuser'),
    util.format('             password: %s', conf.PASSWORD_MASK),
    util.format('           remotePath: %s', '/home/testuser/data'),
    util.format('            localPath: %s', './test-data1'),
    util.format('         skipIfExists: %s', false),
    util.format('      skipIfNotExists: %s', false),
    util.format('          skipIfNewer: %s', false),
    util.format('          skipIfOlder: %s', false),
    util.format('        skipIfSameAge: %s', false),
    util.format('         skipIfBigger: %s', false),
    util.format('        skipIfSmaller: %s', false),
    util.format('       skipIfSameSize: %s', false),
    util.format('  autoCreateLocalPath: %s', true),
    util.format('         customFilter: %s', 'No'),
    util.format('       postProcessing: %s', 'No'),
    util.format('postProcessingOptions: %s', '{}'),
    util.format('        keepTimestamp: %s', false),
    util.format('               prompt: %s', false),
    util.format('              verbose: %s', true),
    util.format('                quiet: %s', false),
    'done',
    '1 downloading /home/testuser/data/Mock_File_1.zip',
    '2 downloading /home/testuser/data/Mock_File_2.zip',
    '1 downloaded /home/testuser/data/Mock_File_1.zip ' + path.normalize('./test-data1/Mock_File_1.zip') + ' 2928',
    '2 downloaded /home/testuser/data/Mock_File_2.zip ' + path.normalize('./test-data1/Mock_File_2.zip') + ' 49453',
    'All done, total downloads = 2.']

  const expectedPrint = ['Downloading Remote File List...']

  const expectedWarn = [
    'Warning: skipIfExists is undefined, defaulting to false.',
    'Warning: skipIfNotExists is undefined, defaulting to false.',
    'Warning: skipIfNewer is undefined, defaulting to false.',
    'Warning: skipIfOlder is undefined, defaulting to false.',
    'Warning: skipIfSameAge is undefined, defaulting to false.',
    'Warning: skipIfBigger is undefined, defaulting to false.',
    'Warning: skipIfSmaller is undefined, defaulting to false.',
    'Warning: skipIfSameSize is undefined, defaulting to false.',
    'Warning: localPath is not exists, auto create. [./test-data1]']

  cuf.mkdir = jest.fn()
  const option = {
    host: '1.0.0.0',
    port: 23,
    verbose: true,
    username: 'testuser',
    password: 'testpassord',
    remotePath: '/home/testuser/data',
    localPath: './test-data1'
  }

  return scp.download(option).then(() => {
    expect(p.verify(expectedPrint)).resolves.toBe(true)
    expect(i.verify(expectedInfo)).resolves.toBe(true)
    expect(w.verify(expectedWarn)).resolves.toBe(true)
  })
})
