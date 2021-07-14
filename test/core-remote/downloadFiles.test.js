const scp = require('node-scp')
const cr0 = require('../../lib/core-remote')
const md0 = require('../mock-data/remotefilelist')

test('remote/downloadFiles/success', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      localPath: './test-data/',
      quiet: false
    },
    scpClient: scp.mockClient,
    filteredFileList: md0.mockRemoteFileList
  }

  const consoleOutput = []
  global.console.info = jest.fn().mockImplementation((s) => { consoleOutput.push(s) })

  const msg = [
    '1 downloading /home/testuser/data/Mock_File_1.zip',
    '2 downloading /home/testuser/data/Mock_File_2.zip']

  cr0.downloadFiles(workingObject)
    .then((workingObject) => {
      expect(workingObject.allDownloadPromises).toHaveLength(md0.mockRemoteFileList.length)
      workingObject.allDownloadPromises.forEach((x) => expect(x).toBeInstanceOf(Promise))

      expect(console.info).toBeCalled()
      consoleOutput.forEach((x) => expect(msg).toContainEqual(x))
      msg.forEach((x) => expect(consoleOutput).toContainEqual(x))
    })
})

test('remote/downloadFiles/success/quiet', () => {
  const workingObject = {
    validatedOption: {
      remotePath: '/home/testuser/data',
      localPath: './test-data/',
      quiet: true
    },
    scpClient: scp.mockClient,
    filteredFileList: md0.mockRemoteFileList
  }

  global.console.info = jest.fn()

  cr0.downloadFiles(workingObject)
    .then((workingObject) => {
      expect(workingObject.allDownloadPromises).toHaveLength(md0.mockRemoteFileList.length)
      workingObject.allDownloadPromises.forEach((x) => expect(x).toBeInstanceOf(Promise))

      expect(console.info).not.toBeCalled()
    })
})
