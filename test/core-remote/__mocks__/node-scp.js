const mockdata = require('../../mock-remotefilelist')

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
            if (expect.getState().currentTestName == 'remote/getFileList/success' ||
                expect.getState().currentTestName == 'remote/getFileList/success/quiet') {
                resolve(mockdata.mockRemoteFileList);
            } else if (expect.getState().currentTestName == 'remote/getFileList/fail' ||
                expect.getState().currentTestName == 'remote/getFileList/fail/quiet'
            )
                reject(new Error("Mock getList: Fail"));
            else
                reject(new Error("Unexpected Test"));
        });
    }
}
