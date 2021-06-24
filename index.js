const scp = require('node-scp');
const fs = require('fs');
const coreparam = require('./lib/core-options');
const coreparamcheck = require('./lib/core-options-check');
const corelocal = require('./lib/core-local');
const coreconf = require('./index.conf');

exports.getVersionNumber = function () {
    return coreconf.PROGRAM_VERSION;
}

exports.download = function (option) {
    return coreparam.initOptions(option)
        .then(verifyOptions)
        .then(optionsMutualCheck)
        .then(corelocal.verifyLocalPath)
        .then(coreparam.printOptions)
        .then(loginscp)
        .then(getRemoteFileList)
        .then(filterFiles)
        .then(downloadRemoteFiles)
        .then(DisconnectOnAllDone);
};

function verifyOptions(workingObject) {
    return coreparam.verifyOptionsQuiet(workingObject)
        .then(coreparam.verifyOptionsVerbose)
        .then(coreparam.verifyOptionsHost)
        .then(coreparam.verifyOptionsUser)
        .then(coreparam.verifyOptionsPassword)
        .then(coreparam.verifyOptionsSkipIfExists)
        .then(coreparam.verifyOptionsSkipIfNotExists)
        .then(coreparam.verifyOptionsPort)
        .then(coreparam.verifyOptionsRemotePath)
        .then(coreparam.verifyOptionsLocalPath)
        ;
};
function optionsMutualCheck(workingObject) {
    return coreparamcheck.verifySkipExistsExclusive(workingObject)
        .then(coreparamcheck.quietAndVerbose);
}

function loginscp(workingObject) {
    return new Promise((resolve, reject) => {
        var validatedOption = workingObject.validatedOption;
        var scpLoginOption = workingObject.scpLoginOption;

        scpLoginOption.host = validatedOption.host;
        scpLoginOption.port = validatedOption.port;
        scpLoginOption.username = validatedOption.username;
        scpLoginOption.password = validatedOption.password;

        return scp(scpLoginOption).then((client) => {
            workingObject.scpClient = client;
            resolve(workingObject);
        });
    });
}

function getRemoteFileList(workingObject) {
    var option = workingObject.validatedOption;
    var client = workingObject.scpClient;

    return new Promise((resolve, reject) => {
        if (option.quiet != true) process.stdout.write("Downloading Remote File List...");
        client.list(option.remotePath)
            .then((remoteFileList) => {
                if (option.quiet != true) console.log("done");
                workingObject.remoteFileList = remoteFileList;
                resolve(workingObject);
            });
    });
}
function filterFiles(workingObject) {
    return new Promise((resolve, reject) => {
        var option = workingObject.validatedOption;
        var remoteFileList = workingObject.remoteFileList;
        workingObject.filteredFileList = remoteFileList.filter((f1) => {

            if (option.skipIfExists) {
                var localfile = option.localPath + '/' + f1.name;
                return !fs.existsSync(localfile);
            }
            if (option.skipIfNotExists) {
                var localfile = option.localPath + '/' + f1.name;
                return fs.existsSync(localfile);
            }
            return true;
        });
        resolve(workingObject);
    });
}
function downloadRemoteFiles(workingObject) {
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
                    console.log(`${filenum} downloading ${remotefile}`);
                client.downloadFile(remotefile, localfile)
                    .then((response) => {
                        if (option.quiet != true)
                            console.log(`${filenum} downloaded ${remotefile} ${localfile} ${filesize}`);
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
function DisconnectOnAllDone(workingObject) {
    return new Promise((resolve, reject) => {
        var d = workingObject.allDownloadPromises;
        var client = workingObject.scpClient;
        var option = workingObject.validatedOption;

        if (d.length > 0) {
            Promise.all(d).then((r) => {
                if (option.quiet != true)
                    console.log("All done, total downloads = %d.", d.length);
                client.close();
                resolve();
            }).catch((e) => {
                client.close();
                reject(e);
            });
        } else {
            console.warn("No file to download");
            client.close();
            resolve();
        }
    });
}
