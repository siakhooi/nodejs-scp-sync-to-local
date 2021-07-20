const scp = require('node-scp')
const cr0 = require('../../lib/core-remote')
const cuf = require('../../lib/core-util-fs')
const md0 = require('../mock-data/remotefilelist')

beforeEach(() => jest.clearAllMocks())

test('remote/downloadFiles/success', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      localPath: './test-data/',
      keepTimestamp: false,
      quiet: false
    },
    scpClient: scp.mockClient,
    filteredFileList: md0.mockRemoteFileList
  }

  const consoleOutput = []
  console.info = jest.fn().mockImplementation((s) => { consoleOutput.push(s) })

  const msg = [
    '1 downloading /home/testuser/data/Mock_File_1.zip',
    '2 downloading /home/testuser/data/Mock_File_2.zip',
    '1 downloaded /home/testuser/data/Mock_File_1.zip ./test-data//Mock_File_1.zip 2928',
    '2 downloaded /home/testuser/data/Mock_File_2.zip ./test-data//Mock_File_2.zip 49453'
  ]

  cr0.downloadFiles(workingObject)
    .then((workingObject) => {
      expect(workingObject.allDownloadPromises).toHaveLength(md0.mockRemoteFileList.length)
      workingObject.allDownloadPromises.forEach((x) => expect(x).toBeInstanceOf(Promise))

      Promise.all(workingObject.allDownloadPromises).then(() => {
        expect(console.info).toBeCalled()
        consoleOutput.forEach((x) => expect(msg).toContainEqual(x))
        msg.forEach((x) => expect(consoleOutput).toContainEqual(x))
      })
    })
})

test('remote/downloadFiles/success/quiet', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      localPath: './test-data/',
      keepTimestamp: false,
      quiet: true
    },
    scpClient: scp.mockClient,
    filteredFileList: md0.mockRemoteFileList
  }

  console.info = jest.fn()

  cr0.downloadFiles(workingObject)
    .then((workingObject) => {
      expect(workingObject.allDownloadPromises).toHaveLength(md0.mockRemoteFileList.length)
      workingObject.allDownloadPromises.forEach((x) => expect(x).toBeInstanceOf(Promise))

      expect(console.info).not.toBeCalled()
    })
})
test('remote/downloadFiles/success/quiet/keepTimestamp', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      localPath: './test-data/',
      keepTimestamp: true,
      quiet: true
    },
    scpClient: scp.mockClient,
    filteredFileList: md0.mockRemoteFileList
  }

  console.info = jest.fn()
  cuf.updateTimes = jest.fn()

  cr0.downloadFiles(workingObject)
    .then((workingObject) => {
      expect(workingObject.allDownloadPromises).toHaveLength(md0.mockRemoteFileList.length)
      workingObject.allDownloadPromises.forEach((x) => expect(x).toBeInstanceOf(Promise))

      Promise.all(workingObject.allDownloadPromises).then((r) => {
        expect(console.info).not.toBeCalled()
        expect(cuf.updateTimes).toBeCalled()
      })
    })
})
