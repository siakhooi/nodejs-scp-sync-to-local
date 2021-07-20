const cd0 = require('../../lib/core-download')

test('download/init', () => {
  const workingObject = {
    validatedOption: {
      quiet: true,
      keepTimestamp: true,
      localPath: '.',
      remotePath: '.'
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
    localFile: './test.txt',
    remoteFile: './test.txt'
  }

  expect(cd0.init(workingObject, remoteFileObject, n)).resolves.toMatchObject(expected)
})
