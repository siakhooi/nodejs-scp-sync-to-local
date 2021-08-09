const scp = require('../../index')
const path = require('path')
const cuf = require('../../lib/core-util-fs')
const cou = require('../../lib/core-output')
const m = require('../mocklib')
const prompt = require('prompt')

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

test('scp/download/prompt/remotePath/1', () => {
  const expectedInfo = [
    'Info: port is undefined, defaulting to 22.',
    'done',
    '1 downloading console/input/remotePath/Mock_File_1.zip',
    '2 downloading console/input/remotePath/Mock_File_2.zip',
    '1 downloaded console/input/remotePath/Mock_File_1.zip ' + path.normalize('./test-data1/Mock_File_1.zip') + ' 2928',
    '2 downloaded console/input/remotePath/Mock_File_2.zip ' + path.normalize('./test-data1/Mock_File_2.zip') + ' 49453',
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
    username: 'testuser',
    password: 'testpassword',
    localPath: './test-data1',
    host: 'host123',
    prompt: true
  }
  const expectedReturnValue = {
    files: [{
      accessTime: 1623577546000,
      modifyTime: 1622867586000,
      name: 'Mock_File_1.zip',
      size: 2928
    },
    {
      accessTime: 1623577546000,
      modifyTime: 1622867586000,
      name: 'Mock_File_2.zip',
      size: 49453
    }],
    totalDownloaded: 0,
    validatedOption: {
      username: 'testuser',
      password: 'testpassword',
      host: 'host123',
      port: 22,
      localPath: './test-data1',
      remotePath: 'console/input/remotePath',
      skipIfBigger: false,
      skipIfExists: false,
      skipIfNewer: false,
      skipIfNotExists: false,
      skipIfOlder: false,
      skipIfSameAge: false,
      skipIfSameSize: false,
      skipIfSmaller: false,
      autoCreateLocalPath: true,
      customFilter: null,
      keepTimestamp: false,
      quiet: false,
      verbose: false
    }
  }
  prompt.start = jest.fn()
  prompt.get = jest.fn()
    .mockResolvedValueOnce({ remotePath: 'console/input/remotePath' })

  return scp.download(option)
    .then((returnValue) => {
      expect(i.verify(expectedInfo)).resolves.toBe(true)
      expect(w.verify(expectedWarn)).resolves.toBe(true)
      expect(p.verify(expectedPrint)).resolves.toBe(true)
      expect(returnValue).toMatchObject(expectedReturnValue)
    })
})
