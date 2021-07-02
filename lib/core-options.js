const conf = require('../index.conf')
const cov = require('./core-options-verify');
const coc = require('./core-options-crosscheck');

exports.init = function (option) {
    return new Promise((resolve, reject) => {
        var workingObject = {};
        workingObject.userOption = option;
        workingObject.validatedOption = {};
        workingObject.scpLoginOption = {};
        workingObject.fileFilters = [];
        workingObject.scpClient = null;
        workingObject.remoteFileList = [];
        workingObject.filteredFileList = [];
        workingObject.allDownloadPromises = [];

        resolve(workingObject);
    });
}
exports.print = function (workingObject) {
    return new Promise((resolve, reject) => {
        var option = workingObject.validatedOption;
        if (option.verbose == true &&
            option.quiet == false) {

            console.log("%s %s", conf.PROGRAM_NAME, conf.PROGRAM_VERSION);
            console.log("");
            console.log("[Parameters]");
            console.log('               host: %s', option.host);
            console.log('               port: %d', option.port);
            console.log('           username: %s', option.username);
            console.log('           password: %s', conf.PASSWORD_MASK);
            console.log('         remotePath: %s', option.remotePath);
            console.log('          localPath: %s', option.localPath);
            console.log('       skipIfExists: %s', option.skipIfExists);
            console.log('    skipIfNotExists: %s', option.skipIfNotExists);
            console.log('        skipIfNewer: %s', option.skipIfNewer);
            console.log('        skipIfOlder: %s', option.skipIfOlder);
            console.log('      skipIfSameAge: %s', option.skipIfSameAge);
            console.log('       skipIfBigger: %s', option.skipIfBigger);
            console.log('      skipIfSmaller: %s', option.skipIfSmaller);
            console.log('     skipIfSameSize: %s', option.skipIfSameSize);
            console.log('autoCreateLocalPath: %s', option.autoCreateLocalPath);
            console.log('            verbose: %s', option.verbose);
            console.log('              quiet: %s', option.quiet);
        }
        resolve(workingObject);
    });
}

exports.verify = function (workingObject) {
    return cov.verifyQuiet(workingObject)
        .then(cov.verifyVerbose)
        .then(cov.verifyHost)
        .then(cov.verifyUser)
        .then(cov.verifyPassword)
        .then(cov.verifySkipIfExists)
        .then(cov.verifySkipIfNotExists)
        .then(cov.verifySkipIfNewer)
        .then(cov.verifySkipIfOlder)
        .then(cov.verifySkipIfSameAge)
        .then(cov.verifySkipIfBigger)
        .then(cov.verifySkipIfSmaller)
        .then(cov.verifySkipIfSameSize)
        .then(cov.verifyPort)
        .then(cov.verifyRemotePath)
        .then(cov.verifyLocalPath)
        .then(cov.verifyAutoCreateLocalPath)
        ;
}

exports.crossVerify = function (workingObject) {
    return coc.checkExistsRule(workingObject)
        .then(coc.checkQuietAndVerbose);
}