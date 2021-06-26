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
                resolve(mockRemoteFileList);
            } else if (expect.getState().currentTestName == 'remote/getFileList/fail' ||
                expect.getState().currentTestName == 'remote/getFileList/fail/quiet'
            )
                reject(new Error("Mock getList: Fail"));
            else
                reject(new Error("Unexpected Test"));
        });
    }
}

mockRemoteFileList = [
    {
        type: '-',
        name: 'Mock_File_1.zip',
        size: 2928,
        modifyTime: 1622867586000,
        accessTime: 1623577546000,
        rights: { user: 'rw', group: 'rw', other: 'r' },
        owner: 1001,
        group: 1001
    },
    {
        type: '-',
        name: 'Mock_File_2.zip',
        size: 49453,
        modifyTime: 1622867586000,
        accessTime: 1623577546000,
        rights: { user: 'rw', group: 'rw', other: 'r' },
        owner: 1001,
        group: 1001
    }
];