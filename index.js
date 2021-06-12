const scp = require('node-scp');
const fs = require('fs');
const util = require('util');

function err(e) { console.error(e); }

exports.download = function (option) {
    return verify(option)
        .then(verifyLocalPath)
        .then(loginscp)
        .then(getRemoteFileList)
        .then(downloadRemoteFile)
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
function verify(option) {
    return new Promise((resolve, reject) => {
        if (option.host == "" || option.host == undefined) reject("Error: host is not defined.");
        else if (option.username == "" || option.username == undefined) reject("Error: username is not defined.");
        else if (option.password == "" || option.password == undefined) reject("Error: password is not defined.");
        else {
            if (option.skipIfExists == undefined) {
                option.skipIfExists = true;
                console.warn("Warning: skipIfExists undefined, defaulting to %s.", option.skipIfExists);
            } else if (typeof (option.skipIfExists) !== "boolean") {
                if (isBoolean(option.skipIfExists)) {
                    option.skipIfExists = isTrue(option.skipIfExists);
                } else {
                    reject("Error: skipIfExists is not a boolean value [%s].", option.skipIfExists);
                }
            }
            if (option.port == "" || option.port == undefined) {
                option.port = 22;
                console.warn("Warning: port undefined, defaulting to %d.", option.port);
            }
            if (option.remotePath == "" || option.remotePath == undefined) {
                option.remotePath = '.';
                console.warn("Warning: remotePath undefined, defaulting to current directory. [%s]", option.remotePath);
            }
            if (option.localPath == "" || option.localPath == undefined) {
                option.localPath = '.';
                console.warn("Warning: localPath undefined, defaulting to current directory. [%s]", option.localPath);
            }
            resolve(option);
        }
    });
}
function verifyLocalPath(option) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(option.localPath)) {
            if (!fs.lstatSync(option.localPath).isDirectory()) {
                reject(util.format("Error: localPath exists and is not a directory. [%s]", option.localPath));
            }
        } else {
            console.warn("Warning: localPath not exists, auto create. [%s]", option.localPath);
            fs.mkdirSync(option.localPath);
        }
        resolve(option);
    });
}

function loginscp(option) {
    var h = {
        host: option.host,
        port: option.port,
        username: option.username,
        password: option.password
    };
    return new Promise((resolve, reject) => {
        return scp(h).then((client) => {
            option.client = client;
            resolve(option);
        });
    });
}

function getRemoteFileList(option) {
    return new Promise((resolve, reject) => {
        process.stdout.write("Downloading Remote File List...");
        option.client.list(option.remotePath)
            .then((remoteFileList) => {
                console.log("done");
                option.remoteFileList = remoteFileList;
                resolve(option);
            });
    });
}

function downloadRemoteFile(option) {
    var d = option.remoteFileList.filter((f1) => {
        if (option.skipIfExists) {
            var localfile = option.localPath + '/' + f1.name;
            return !fs.existsSync(localfile);
        } else return true;
    }).map((f1, n) => {
        return new Promise((resolve, reject) => {
            var localfile = option.localPath + '/' + f1.name;
            var remotefile = option.remotePath + '/' + f1.name;
            var filesize = f1.size;
            console.log(`${n} downloading ${remotefile}`);
            option.client.downloadFile(remotefile, localfile)
                .then((response) => {
                    console.log(`${n} downloaded ${remotefile} ${localfile} ${filesize}`);
                    resolve(f1.name);
                }).catch((e) => {
                    err(e);
                    reject(f1.name);
                });
        });
    });

    console.log("Downloads: " + d.length);
    if (d.length > 0) {
        Promise.all(d).then((r) => {
            console.log("All done");
            option.client.close();
        }).catch((e) => {
            err(e);
            option.client.close();
        });
    } else {
        console.warn("No file to download");
        option.client.close();
    }
}
