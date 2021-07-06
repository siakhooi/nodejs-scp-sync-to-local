const cv0 = require('./lib/core-version');
const co0 = require('./lib/core-options');
const cf0 = require('./lib/core-filters');
const cl0 = require('./lib/core-local');
const cr0 = require('./lib/core-remote');

exports.getVersionNumber = cv0.getVersionNumber;

exports.download = function (option) {
    return co0.init(option)
        .then(co0.verifyBasic)
        .then(co0.printProgramName)
        .then(co0.verify)
        .then(co0.crossVerify)
        .then(co0.print)
        .then(cf0.setupFilters)
        .then(cl0.verifyLocalPath)
        .then(cr0.login)
        .then(cr0.getFileList)
        .then(cf0.filterFiles)
        .then(cr0.downloadFiles)
        .then(cr0.disconnectOnAllDone);
};
