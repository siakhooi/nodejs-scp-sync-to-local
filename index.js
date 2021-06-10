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
function verifyLocalPath(option) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(option.localpath)) {
            if (!fs.lstatSync(option.localpath).isDirectory()) {
                reject(util.format("Error: localpath exists and is not a directory. [%s]", option.localpath));
            }
        } else {
            console.warn("Warning: localpath not exists, auto create. [%s]", option.localpath);
            fs.mkdirSync(option.localpath);
        }
        resolve(option);
    });
}

function verify(option) {
    return new Promise((resolve, reject) => {
        if (option.host == "" || option.host == undefined) reject("Error: host is not defined.");
        else if (option.username == "" || option.username == undefined) reject("Error: username is not defined.");
        else if (option.password == "" || option.password == undefined) reject("Error: password is not defined.");
        else {
            if (option.port == "" || option.port == undefined) {
                option.port = 22;
                console.warn("Warning: port undefined, defaulting to %d.", option.port);
            }
            if (option.remotepath == "" || option.remotepath == undefined) {
                option.remotepath = '.';
                console.warn("Warning: remotepath undefined, defaulting to current directory. [%s]", option.remotepath);
            }
            if (option.localpath == "" || option.localpath == undefined) {
                option.localpath = '.';
                console.warn("Warning: localpath undefined, defaulting to current directory. [%s]", option.localpath);
            }
            resolve(option);
        }
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
        option.client.list(option.remotepath)
            .then((remoteFileList) => {
                console.log("done");
                option.remoteFileList = remoteFileList;
                resolve(option);
            });
    });
}

function downloadRemoteFile(option) {
    var d = option.remoteFileList.map((f1, n) => {
        return new Promise((resolve, reject) => {
            var localfile = option.localpath + '/' + f1.name;
            var remotefile = option.remotepath + '/' + f1.name;
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
