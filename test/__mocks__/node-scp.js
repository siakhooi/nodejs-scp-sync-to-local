const md0 = require('../mock-data/remotefilelist')

module.exports = {
  Client: function (scpLoginOption) {
    return new Promise((resolve, reject) => {
      const testName = expect.getState().currentTestName

      if (testName === 'core-remote/login/+') {
        resolve({ result: 'Mock Connection: Success' })
      } else if (testName === 'core-remote/login/-') {
        reject(new Error('Mock Connection: Fail'))
      } else if (testName.startsWith('scp/download/')) {
        resolve(module.exports.mockClient)
      } else { reject(new Error('Unexpected Test(scp): ' + expect.getState().currentTestName)) }
    })
  }
}
module.exports.mockClient = {
  list: function (remotePath) {
    return new Promise((resolve, reject) => {
      const testName = expect.getState().currentTestName

      if (testName === 'core-remote/getFileList/+' ||
        testName === 'core-remote/getFileList/quiet' ||
        testName.startsWith('scp/download/')) {
        resolve(md0.mockRemoteFileList)
      } else if (testName === 'core-remote/getFileList/-' ||
        testName === 'core-remote/getFileList/quiet/-') {
        reject(new Error('Mock getList: Fail'))
      } else reject(new Error('Unexpected Test(list):' + expect.getState().currentTestName))
    })
  },
  downloadFile: function (remotePath, localPath) {
    return new Promise((resolve, reject) => {
      const testName = expect.getState().currentTestName
      if (testName === 'core-remote/downloadFiles/+' ||
        testName === 'core-remote/downloadFiles/quiet' ||
        testName === 'core-remote/downloadFiles/quiet/keepTimestamp' ||
        testName === 'core-remote/downloadFiles/postProcessing' ||
        testName.startsWith('scp/download/')) {
        resolve()
      } else reject(new Error('Unexpected Test(downloadFile):' + expect.getState().currentTestName))
    })
  },
  close: function () {
    const testName = expect.getState().currentTestName
    if (testName === 'core-remote/disconnectOnAllDone/+' ||
      testName === 'core-remote/disconnectOnAllDone/quiet' ||
      testName === 'core-remote/disconnectOnAllDone/no-download' ||
      testName === 'core-remote/disconnectOnAllDone/-' ||
      testName.startsWith('scp/download/')) {
      // Doing Nothing
    } else throw new Error('Unexpected Test(close):' + expect.getState().currentTestName)
  }
}
