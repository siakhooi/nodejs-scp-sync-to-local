const md0 = require('../../mock-data/remotefilelist')

module.exports = function (scpLoginOption) {
    return new Promise((resolve, reject) => {
        if (expect.getState().currentTestName == 'remote/login/success')
            resolve({ result: 'Mock Connection: Success' });
        else if (expect.getState().currentTestName == 'remote/login/fail')
            reject(new Error("Mock Connection: Fail"));
        else
            reject(new Error("Unexpected Test"));
    });
}
module.exports.mockClient = {
    list: function (remotePath) {
        return new Promise((resolve, reject) => {
            var testName = expect.getState().currentTestName;

            if (testName == 'remote/getFileList/success' ||
                testName == 'remote/getFileList/success/quiet') {

                resolve(md0.mockRemoteFileList);

            } else
                if (testName == 'remote/getFileList/fail' ||
                    testName == 'remote/getFileList/fail/quiet') {

                    reject(new Error("Mock getList: Fail"));

                } else reject(new Error("Unexpected Test"));
        });
    },
    downloadFile: function (remotePath, localPath) {
        return new Promise((resolve, reject) => {
            var testName = expect.getState().currentTestName;
            if (testName == 'remote/downloadFiles/success' ||
                testName == 'remote/downloadFiles/success/quiet') {
                return Promise.resolve();
            } else reject(new Error("Unexpected Test"));
        });
    }
}