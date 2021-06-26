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
