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

test('scp/download/prompt/all/+', () => {
  const expectedInfo = [
    'Info: port is undefined, defaulting to 22.',
    'done',
    '1 downloading console/input/remotePath/Mock_File_1.zip',
    '2 downloading console/input/remotePath/Mock_File_2.zip',
    '1 downloaded console/input/remotePath/Mock_File_1.zip ' + path.normalize('console/input/localPath/Mock_File_1.zip') + ' 2928',
    '2 downloaded console/input/remotePath/Mock_File_2.zip ' + path.normalize('console/input/localPath/Mock_File_2.zip') + ' 49453',
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
    'Warning: localPath is not exists, auto create. [console/input/localPath]']

  const expectedPrint = ['Downloading Remote File List...']

  cuf.mkdir = jest.fn()

  const option = {
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
      autoCreateLocalPath: true,
      customFilter: null,
      keepTimestamp: false,
      port: 22,
      quiet: false,
      skipIfBigger: false,
      skipIfExists: false,
      skipIfNewer: false,
      skipIfNotExists: false,
      skipIfOlder: false,
      skipIfSameAge: false,
      skipIfSameSize: false,
      skipIfSmaller: false,
      host: 'consoleinputhost',
      username: 'consoleinputusername',
      password: 'consoleinputpassword',
      localPath: 'console/input/localPath',
      remotePath: 'console/input/remotePath',
      verbose: false
    }
  }
  prompt.start = jest.fn()
  prompt.get = jest.fn()
    .mockResolvedValueOnce({ host: 'consoleinputhost' })
    .mockResolvedValueOnce({ username: 'consoleinputusername' })
    .mockResolvedValueOnce({ password: 'consoleinputpassword' })
    .mockResolvedValueOnce({ localPath: 'console/input/localPath' })
    .mockResolvedValueOnce({ remotePath: 'console/input/remotePath' })

  return scp.download(option)
    .then((returnValue) => {
      expect(i.verify(expectedInfo)).resolves.toBe(true)
      expect(w.verify(expectedWarn)).resolves.toBe(true)
      expect(p.verify(expectedPrint)).resolves.toBe(true)
      expect(returnValue).toMatchObject(expectedReturnValue)
    })
})
