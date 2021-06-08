const scp = require('node-scp');
const fs = require('fs');

function err(e) { console.error(e); }

exports.download = function (option) {
    return verify(option)
        .then(loginscp)
        .then(getRemoteFileList)
        .then(downloadRemoteFile)
        .catch(err);
}
function verify(option) {
    return new Promise((resolve, reject) => {
        if (option.host == "" || option.host == undefined) reject("Error: host is not defined.");
        else if (option.username == "" || option.username == undefined) reject("Error: username is not defined.");
        else if (option.password == "" || option.password == undefined) reject("Error: password is not defined.");
        else {
            if (option.port == "" || option.port == undefined) {
                option.port = 22;
                console.log("Warning: port undefined, defaulting to 22.")
            }
            if (option.remotepath == "" || option.remotepath == undefined) {
                option.remotepath = '.';
                console.log("Warning: remotepath undefined, defaulting to current directory(.).")
            }
            if (option.localpath == "" || option.localpath == undefined) {
                option.localpath = '.';
                console.log("Warning: localpath undefined, defaulting to current directory(.).")
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
        console.log("No file to download");
        option.client.close();
    }
}
