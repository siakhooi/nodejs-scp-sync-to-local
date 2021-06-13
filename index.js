const scp = require('node-scp');
const fs = require('fs');
const util = require('util');

function err(e) { console.error(e); }

exports.download = function (option) {
    return init(option)
        .then(verifyOptions)
        .then(verifyLocalPath)
        .then(loginscp)
        .then(getRemoteFileList)
        .then(downloadRemoteFiles)
        .then(DisconnectOnAllDone)
        .catch(err);
}
function isTrue(s) {
    var i = s.toLowerCase().trim();
    switch (i) {
        case "false":
        case "0":
        case "off":
        case "no":
        case "n":
            return false;
    }
    return !!s;
}
function isBoolean(s) {
    var i = s.toLowerCase().trim();
    switch (i) {
        case "false":
        case "0":
        case "off":
        case "no":
        case "n":
            return true;
        case "true":
        case "1":
        case "on":
        case "yes":
        case "y":
            return true;
    }
    return false;
}
function init(option) {
    return new Promise((resolve, reject) => {
        var workingObject = {};
        workingObject.userOption = option;
        workingObject.validatedOption = {};
        workingObject.scpLoginOption = {};
        workingObject.scpClient = null;
        workingObject.remoteFileList = [];
        workingObject.allDownloadPromises = [];

        resolve(workingObject);
    });

}
function verifyOptions(workingObject) {
    return new Promise((resolve, reject) => {
        var userOption = workingObject.userOption;
        var validatedOption = workingObject.validatedOption;

        if (userOption.host == "" || userOption.host == undefined) {
            reject("Error: host is not defined.");
            return;
        } else {
            validatedOption.host = userOption.host;
        }

        if (userOption.username == "" || userOption.username == undefined) {
            reject("Error: username is not defined.");
            return;
        } else {
            validatedOption.username = userOption.username;
        }
        if (userOption.password == "" || userOption.password == undefined) {
            reject("Error: password is not defined.");
            return;
        } else {
            validatedOption.password = userOption.password;
        }

        if (userOption.skipIfExists == undefined) {
            validatedOption.skipIfExists = true;
            console.warn("Warning: skipIfExists undefined, defaulting to %s.", validatedOption.skipIfExists);
        } else if (typeof (userOption.skipIfExists) !== "boolean") {
            if (isBoolean(userOption.skipIfExists)) {
                validatedOption.skipIfExists = isTrue(userOption.skipIfExists);
            } else {
                reject("Error: skipIfExists is not a boolean value [%s].", userOption.skipIfExists);
                return;
            }
        } else {
            validatedOption.skipIfExists = userOption.skipIfExists;
        }

        if (userOption.port == "" || userOption.port == undefined) {
            validatedOption.port = 22;
            console.warn("Warning: port undefined, defaulting to %d.", validatedOption.port);
        } else {
            validatedOption.port = userOption.port;
        }

        if (userOption.remotePath == "" || userOption.remotePath == undefined) {
            validatedOption.remotePath = '.';
            console.warn("Warning: remotePath undefined, defaulting to current directory. [%s]", validatedOption.remotePath);
        } else {
            validatedOption.remotePath = userOption.remotePath;
        }

        if (userOption.localPath == "" || userOption.localPath == undefined) {
            validatedOption.localPath = '.';
            console.warn("Warning: localPath undefined, defaulting to current directory. [%s]", validatedOption.localPath);
        } else {
            validatedOption.localPath = userOption.localPath;
        }
        resolve(workingObject);

    });
}
function verifyLocalPath(workingObject) {
    return new Promise((resolve, reject) => {
        var option = workingObject.validatedOption;

        if (fs.existsSync(option.localPath)) {
            if (!fs.lstatSync(option.localPath).isDirectory()) {
                reject(util.format("Error: localPath exists and is not a directory. [%s]", option.localPath));
            } else {
                resolve(workingObject);
            }
        } else {
            console.warn("Warning: localPath not exists, auto create. [%s]", option.localPath);
            fs.mkdirSync(option.localPath);
            resolve(workingObject);
        }
    });
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
        process.stdout.write("Downloading Remote File List...");
        client.list(option.remotePath)
            .then((remoteFileList) => {
                console.log("done");
                workingObject.remoteFileList = remoteFileList;
                resolve(workingObject);
            });
    });
}

function downloadRemoteFiles(workingObject) {
    var option = workingObject.validatedOption;
    var remoteFileList = workingObject.remoteFileList;
    var client = workingObject.scpClient;

    return new Promise((resolve, reject) => {
        var d = remoteFileList.filter((f1) => {

            if (option.skipIfExists) {
                var localfile = option.localPath + '/' + f1.name;
                return !fs.existsSync(localfile);
            } else return true;
        }).map((f1, n) => {

            return new Promise((resolve, reject) => {
                var localfile = option.localPath + '/' + f1.name;
                var remotefile = option.remotePath + '/' + f1.name;
                var filesize = f1.size;
                var filenum = n + 1;

                console.log(`${filenum} downloading ${remotefile}`);
                client.downloadFile(remotefile, localfile)
                    .then((response) => {
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

        if (d.length > 0) {
            Promise.all(d).then((r) => {
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
