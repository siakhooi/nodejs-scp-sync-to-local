const md0 = require('../../mock-data/remotefilelist')

module.exports = function (scpLoginOption) {
  return new Promise((resolve, reject) => {
    if (expect.getState().currentTestName === 'remote/login/success') {
      resolve({ result: 'Mock Connection: Success' })
    } else if (expect.getState().currentTestName === 'remote/login/fail') {
      reject(new Error('Mock Connection: Fail'))
    } else { reject(new Error('Unexpected Test')) }
  })
}
module.exports.mockClient = {
  list: function (remotePath) {
    return new Promise((resolve, reject) => {
      const testName = expect.getState().currentTestName

      if (testName === 'remote/getFileList/success' ||
        testName === 'remote/getFileList/success/quiet') {
        resolve(md0.mockRemoteFileList)
      } else if (testName === 'remote/getFileList/fail' ||
        testName === 'remote/getFileList/fail/quiet') {
        reject(new Error('Mock getList: Fail'))
      } else reject(new Error('Unexpected Test'))
    })
  },
  downloadFile: function (remotePath, localPath) {
    return new Promise((resolve, reject) => {
      const testName = expect.getState().currentTestName
      if (testName === 'remote/downloadFiles/success' ||
        testName === 'remote/downloadFiles/success/quiet' ||
        testName === 'remote/downloadFiles/success/quiet/keepTimestamp') {
        resolve()
      } else reject(new Error('Unexpected Test'))
    })
  },
  close: function () {
    const testName = expect.getState().currentTestName
    if (testName === 'remote/disconnectOnAllDone/success' ||
      testName === 'remote/disconnectOnAllDone/success/quiet' ||
      testName === 'remote/disconnectOnAllDone/no-download') {
      // Doing Nothing
    } else throw new Error('Unexpected Test')
  }
}
