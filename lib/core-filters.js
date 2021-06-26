const fs1 = require('./core-util');

// return true to download: true if file not exist
exports.skipIfExists = function (localFile) {
    return !fs1.isPathExist(localFile);
}

// return true to download: true if file exist
exports.skipIfNotExists = function (localFile) {
    return fs1.isPathExist(localFile);
}

exports.setupFilters = function (workingObject) {
    return new Promise((resolve, reject) => {
        var option = workingObject.validatedOption;
        var fileFilters = workingObject.fileFilters;

        if (option.skipIfExists) fileFilters.push(exports.skipIfExists);
        if (option.skipIfNotExists) fileFilters.push(exports.skipIfNotExists);

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
