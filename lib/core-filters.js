const fs1 = require('./core-util');

// return true to download: true if file not exist
exports.skipIfExists = function (localFile) {
    return !fs1.isPathExist(localFile);
}
// return true to download: true if file exist
exports.skipIfNotExists = function (localFile) {
    return fs1.isPathExist(localFile);
}
// return true to download: true if file not newer (older or not exist)
exports.skipIfNewer = function (localFile, remoteFile) {
    return !fs1.isNewer(localFile, remoteFile.modifyTime);
}
// return true to download: true if file not older (newer or not exist)
exports.skipIfOlder = function (localFile, remoteFile) {
    return !fs1.isOlder(localFile, remoteFile.modifyTime);
}
// return true to download: true if file not bigger ( smaller or not exist)
exports.skipIfBigger = function (localFile, remoteFile) {
    return !fs1.isBigger(localFile, remoteFile.size);
}
// return true to download: true if file not smaller ( bigger or not exist)
exports.skipIfSmaller = function (localFile, remoteFile) {
    return !fs1.isSmaller(localFile, remoteFile.size);
}

exports.setupFilters = function (workingObject) {
    return new Promise((resolve, reject) => {
        var option = workingObject.validatedOption;
        var fileFilters = workingObject.fileFilters;

        if (option.skipIfExists) fileFilters.push(exports.skipIfExists);
        if (option.skipIfNotExists) fileFilters.push(exports.skipIfNotExists);
        if (option.skipIfNewer) fileFilters.push(exports.skipIfNewer);
        if (option.skipIfOlder) fileFilters.push(exports.skipIfOlder);
        if (option.skipIfBigger) fileFilters.push(exports.skipIfBigger);
        if (option.skipIfSmaller) fileFilters.push(exports.skipIfSmaller);

        resolve(workingObject);
    });
}

exports.filterFiles = function (workingObject) {
    return new Promise((resolve, reject) => {
        var option = workingObject.validatedOption;
        var remoteFileList = workingObject.remoteFileList;

        workingObject.filteredFileList = remoteFileList.filter((remoteFile) => {
            if (workingObject.fileFilters.length == 0) return true;

            var localFileName = option.localPath + '/' + remoteFile.name;

            return workingObject.fileFilters.every((fn) => {
                return fn(localFileName, remoteFile);
            });
        });
        resolve(workingObject);
    });
}
