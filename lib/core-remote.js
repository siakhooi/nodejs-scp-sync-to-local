const scp = require('node-scp');

exports.login = function (workingObject) {
    return new Promise((resolve, reject) => {
        var validatedOption = workingObject.validatedOption;
        var scpLoginOption = workingObject.scpLoginOption;

        scpLoginOption.host = validatedOption.host;
        scpLoginOption.port = validatedOption.port;
        scpLoginOption.username = validatedOption.username;
        scpLoginOption.password = validatedOption.password;

        return scp(scpLoginOption)
            .then((client) => {
                workingObject.scpClient = client;
                resolve(workingObject);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
exports.getFileList = function (workingObject) {
    return new Promise((resolve, reject) => {
        var option = workingObject.validatedOption;
        var client = workingObject.scpClient;

        if (!option.quiet) process.stdout.write("Downloading Remote File List...");
        return client.list(option.remotePath)
            .then((remoteFileList) => {
                if (!option.quiet) console.info("done");
                workingObject.remoteFileList = remoteFileList;
                resolve(workingObject);
            })
            .catch((err) => reject(err));
    });
}
