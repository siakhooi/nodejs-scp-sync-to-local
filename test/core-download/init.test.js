const cd0 = require('../../lib/core-download')
const path = require('path')

test('core-download/init/+', () => {
  const dummyFunction = () => { }
  const workingObject = {
    validatedOption: {
      quiet: true,
      keepTimestamp: true,
      localPath: '.',
      remotePath: '.',
      postProcessing: dummyFunction,
      postProcessingOptions: { x: 3 }
    },
    scpClient: {}
  }
  const remoteFileObject = {
    name: 'test.txt',
    size: 1000,
    accessTime: 1622867586000,
    modifyTime: 1623577546000
  }
  const n = 1

  const expected = {
    client: {},
    fileNum: 1,
    remoteFileObject: {
      name: 'test.txt',
      size: 1000,
      accessTime: 1622867586000,
      modifyTime: 1623577546000
    },
    fileName: 'test.txt',
    fileSize: 1000,
    quiet: true,
    keepTimestamp: true,
    accessTime: 1622867586000,
    modifyTime: 1623577546000,
    localPath: '.',
    remotePath: '.',
    localFile: path.normalize('.' + path.sep + 'test.txt'),
    remoteFile: '.' + path.posix.sep + 'test.txt',
    postProcessing: dummyFunction,
    postProcessingOptions: { x: 3 }
  }

  expect(cd0.init(workingObject, remoteFileObject, n)).resolves.toMatchObject(expected)
})
