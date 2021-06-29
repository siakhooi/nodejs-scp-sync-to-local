const coreparam = require('./lib/core-options');
const coreparamcheck = require('./lib/core-options-check');
const corelocal = require('./lib/core-local');
const coreconf = require('./index.conf');
const coreremote = require('./lib/core-remote');
const corefilters = require('./lib/core-filters');

exports.getVersionNumber = function () {
    return coreconf.PROGRAM_VERSION;
}

exports.download = function (option) {
    return coreparam.initOptions(option)
        .then(verifyOptions)
        .then(optionsMutualCheck)
        .then(coreparam.printOptions)
        .then(corefilters.setupFilters)
        .then(corelocal.verifyLocalPath)
        .then(coreremote.login)
        .then(coreremote.getFileList)
        .then(corefilters.filterFiles)
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
        .then(coreparam.verifyOptionsSkipIfNewer)
        .then(coreparam.verifyOptionsSkipIfOlder)
        .then(coreparam.verifyOptionsSkipIfSameAge)
        .then(coreparam.verifyOptionsSkipIfBigger)
        .then(coreparam.verifyOptionsSkipIfSmaller)
        .then(coreparam.verifyOptionsSkipIfSameSize)
        .then(coreparam.verifyOptionsPort)
        .then(coreparam.verifyOptionsRemotePath)
        .then(coreparam.verifyOptionsLocalPath)
        .then(coreparam.verifyOptionsAutoCreateLocalPath)
        ;
};
function optionsMutualCheck(workingObject) {
    return coreparamcheck.verifySkipExistsExclusive(workingObject)
        .then(coreparamcheck.quietAndVerbose);
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
