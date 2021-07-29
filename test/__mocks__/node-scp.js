const md0 = require('../mock-data/remotefilelist')

module.exports = function (scpLoginOption) {
  return new Promise((resolve, reject) => {
    const testName = expect.getState().currentTestName

    if (testName === 'remote/login/success') {
      resolve({ result: 'Mock Connection: Success' })
    } else if (testName === 'remote/login/fail') {
      reject(new Error('Mock Connection: Fail'))
    } else if (testName.startsWith('scp/download/')) {
      resolve(module.exports.mockClient)
    } else { reject(new Error('Unexpected Test(scp): ' + expect.getState().currentTestName)) }
  })
}
module.exports.mockClient = {
  list: function (remotePath) {
    return new Promise((resolve, reject) => {
      const testName = expect.getState().currentTestName

      if (testName === 'remote/getFileList/success' ||
        testName === 'remote/getFileList/success/quiet' ||
        testName.startsWith('scp/download/')) {
        resolve(md0.mockRemoteFileList)
      } else if (testName === 'remote/getFileList/fail' ||
        testName === 'remote/getFileList/fail/quiet') {
        reject(new Error('Mock getList: Fail'))
      } else reject(new Error('Unexpected Test(list):' + expect.getState().currentTestName))
    })
  },
  downloadFile: function (remotePath, localPath) {
    return new Promise((resolve, reject) => {
      const testName = expect.getState().currentTestName
      if (testName === 'remote/downloadFiles/success' ||
        testName === 'remote/downloadFiles/success/quiet' ||
        testName === 'remote/downloadFiles/success/quiet/keepTimestamp' ||
        testName === 'remote/downloadFiles/success/postProcessing' ||
        testName.startsWith('scp/download/')) {
        resolve()
      } else reject(new Error('Unexpected Test(downloadFile):' + expect.getState().currentTestName))
    })
  },
  close: function () {
    const testName = expect.getState().currentTestName
    if (testName === 'remote/disconnectOnAllDone/success' ||
      testName === 'remote/disconnectOnAllDone/success/quiet' ||
      testName === 'remote/disconnectOnAllDone/no-download' ||
      testName.startsWith('scp/download/')) {
      // Doing Nothing
    } else throw new Error('Unexpected Test(close):' + expect.getState().currentTestName)
  }
}
