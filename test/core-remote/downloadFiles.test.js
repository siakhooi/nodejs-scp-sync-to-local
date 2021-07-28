const scp = require('node-scp')
const cr0 = require('../../lib/core-remote')
const cuf = require('../../lib/core-util-fs')
const md0 = require('../mock-data/remotefilelist')
const cou = require('../../lib/core-output')
const m = require('../mocklib')
const path = require('path')

const i = new m.MockOutput()
cou.info = i.fn()

beforeEach(() => {
  i.clear()
})

test('remote/downloadFiles/success', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      localPath: './test-data',
      keepTimestamp: false,
      quiet: false
    },
    scpClient: scp.mockClient,
    filteredFileList: md0.mockRemoteFileList
  }

  const expectedInfo = [
    '1 downloading /home/testuser/data/Mock_File_1.zip',
    '2 downloading /home/testuser/data/Mock_File_2.zip',
    '1 downloaded /home/testuser/data/Mock_File_1.zip ' + path.normalize('./test-data/Mock_File_1.zip') + ' 2928',
    '2 downloaded /home/testuser/data/Mock_File_2.zip ' + path.normalize('./test-data/Mock_File_2.zip') + ' 49453'
  ]

  cr0.downloadFiles(workingObject)
    .then((workingObject) => {
      expect(workingObject.allDownloadPromises).toHaveLength(md0.mockRemoteFileList.length)
      workingObject.allDownloadPromises.forEach((x) => expect(x).toBeInstanceOf(Promise))

      Promise.all(workingObject.allDownloadPromises).then(() => {
        expect(i.verify(expectedInfo)).resolves.toBe(true)
      })
    })
})

test('remote/downloadFiles/success/quiet', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      localPath: './test-data',
      keepTimestamp: false,
      quiet: true
    },
    scpClient: scp.mockClient,
    filteredFileList: md0.mockRemoteFileList
  }

  cr0.downloadFiles(workingObject)
    .then((workingObject) => {
      expect(workingObject.allDownloadPromises).toHaveLength(md0.mockRemoteFileList.length)
      workingObject.allDownloadPromises.forEach((x) => expect(x).toBeInstanceOf(Promise))

      expect(i.verifyFalse()).resolves.toBe(true)
    })
})
test('remote/downloadFiles/success/quiet/keepTimestamp', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      localPath: './test-data',
      keepTimestamp: true,
      quiet: true
    },
    scpClient: scp.mockClient,
    filteredFileList: md0.mockRemoteFileList
  }

  cuf.updateTimes = jest.fn()

  cr0.downloadFiles(workingObject)
    .then((workingObject) => {
      expect(workingObject.allDownloadPromises).toHaveLength(md0.mockRemoteFileList.length)
      workingObject.allDownloadPromises.forEach((x) => expect(x).toBeInstanceOf(Promise))

      Promise.all(workingObject.allDownloadPromises).then((r) => {
        expect(i.verifyFalse()).resolves.toBe(true)
        expect(cuf.updateTimes).toBeCalled()
      })
    })
})
