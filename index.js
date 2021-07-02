const cv0 = require('./lib/core-version');
const co0 = require('./lib/core-options');
const coc = require('./lib/core-options-crosscheck');
const cf0 = require('./lib/core-filters');
const cl0 = require('./lib/core-local');
const cr0 = require('./lib/core-remote');

exports.getVersionNumber = cv0.getVersionNumber;

exports.download = function (option) {
    return co0.init(option)
        .then(co0.verify)
        .then(optionsMutualCheck)
        .then(co0.print)
        .then(cf0.setupFilters)
        .then(cl0.verifyLocalPath)
        .then(cr0.login)
        .then(cr0.getFileList)
        .then(cf0.filterFiles)
        .then(downloadRemoteFiles)
        .then(DisconnectOnAllDone);
};

function optionsMutualCheck(workingObject) {
    return coc.checkExistsRule(workingObject)
        .then(coc.checkQuietAndVerbose);
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
