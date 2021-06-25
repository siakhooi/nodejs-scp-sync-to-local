const util = require('util');
const fs1 = require('./core-util');

exports.verifyLocalPath = function (workingObject) {
    return new Promise((resolve, reject) => {
        var option = workingObject.validatedOption;

        if (fs1.isPathExist(option.localPath)) {
            if (!fs1.isDirectory(option.localPath)) {
                reject(
                    new Error(util.format("Error: localPath exists and is not a directory. [%s]", option.localPath))
                );
            } else {
                resolve(workingObject);
            }
        } else {
            if (option.autoCreateLocalPath) {
                if (!option.quiet)
                    console.warn(util.format("Warning: localPath not exists, auto create. [%s]", option.localPath));
                fs1.mkdir(option.localPath);
                resolve(workingObject);
            } else {
                reject(
                    new Error(util.format("Error: localPath not exists and autoCreateLocalPath=false. [%s]", option.localPath))
                );

            }
        }
    });
}

