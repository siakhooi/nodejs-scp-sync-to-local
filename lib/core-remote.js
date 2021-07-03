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
exports.downloadFiles = function (workingObject) {
    var option = workingObject.validatedOption;
    var filteredFileList = workingObject.filteredFileList;
    var client = workingObject.scpClient;

    return new Promise((resolve, reject) => {
        var d = filteredFileList.map((f1, n) => {

            return new Promise((resolve, reject) => {
                var localfile = option.localPath + '/' + f1.name;
                var remotefile = option.remotePath + '/' + f1.name;
                var filesize = f1.size;
                var filenum = n + 1;

                if (option.quiet != true)
                    console.info(`${filenum} downloading ${remotefile}`);
                client.downloadFile(remotefile, localfile)
                    .then((response) => {
                        if (option.quiet != true)
                            console.info(`${filenum} downloaded ${remotefile} ${localfile} ${filesize}`);
                        resolve(f1.name);
                    }).catch((e) => {
                        err(e);
                        reject(f1.name);
                    });
            });
        });

        workingObject.allDownloadPromises = d;
        resolve(workingObject);
    });
}
