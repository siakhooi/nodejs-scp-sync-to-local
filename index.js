const scp = require('node-scp');
const fs = require('fs');

function err(e) { console.error(e); }

exports.download = function (option) {
    return loginscp(option)
        .then(getRemoteFileList)
        .then(downloadRemoteFile)
        .catch(err);
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
