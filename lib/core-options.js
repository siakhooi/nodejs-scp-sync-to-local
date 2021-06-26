const util = require('util');
const u = require('./core-util');
const conf = require('../index.conf')


module.exports = {
    initOptions: function (option) {
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
    },
    printOptions: function (workingObject) {
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
                console.log('autoCreateLocalPath: %s', option.autoCreateLocalPath);
                console.log('            verbose: %s', option.verbose);
                console.log('              quiet: %s', option.quiet);
            }
            resolve(workingObject);
        });
    },
    verifyOptionsHost: function (workingObject) {
        return new Promise((resolve, reject) => {
            if (workingObject.userOption.host == "" ||
                workingObject.userOption.host == undefined) {
                workingObject.validatedOption.host = conf.DEFAULT_HOSTNAME;
                if (!workingObject.validatedOption.quiet)
                    console.warn(util.format("Warning: host undefined, defaulting to %s.", conf.DEFAULT_HOSTNAME));
                resolve(workingObject);
            } else {
                workingObject.validatedOption.host = workingObject.userOption.host;
                resolve(workingObject);
            }
        });
    },
    verifyOptionsUser: function (workingObject) {
        return new Promise((resolve, reject) => {
            if (workingObject.userOption.username == "" ||
                workingObject.userOption.username == undefined) {
                reject(new Error("Error: username is not defined."));
            } else {
                workingObject.validatedOption.username = workingObject.userOption.username;
                resolve(workingObject);
            }
        });
    },
    verifyOptionsPassword: function (workingObject) {
        return new Promise((resolve, reject) => {
            if (workingObject.userOption.password == "" ||
                workingObject.userOption.password == undefined) {
                reject(new Error("Error: password is not defined."));
            } else {
                workingObject.validatedOption.password = workingObject.userOption.password;
                resolve(workingObject);
            }
        });
    },
    verifyOptionsSkipIfExists: function (workingObject) {
        return new Promise((resolve, reject) => {
            if (workingObject.userOption.skipIfExists == undefined) {
                workingObject.validatedOption.skipIfExists = conf.DEFAULT_SKIPIFEXISTS;
                if (!workingObject.validatedOption.quiet)
                    console.warn(util.format("Warning: skipIfExists undefined, defaulting to %s.", workingObject.validatedOption.skipIfExists));
                resolve(workingObject);

            } else if (typeof (workingObject.userOption.skipIfExists) !== "boolean") {
                if (u.isBoolean(workingObject.userOption.skipIfExists)) {
                    workingObject.validatedOption.skipIfExists = u.isTrue(workingObject.userOption.skipIfExists);
                    resolve(workingObject);

                } else {
                    reject(new Error(
                        util.format("Error: skipIfExists is not a boolean value [%s].", workingObject.userOption.skipIfExists)
                    ));
                }
            } else {
                workingObject.validatedOption.skipIfExists = workingObject.userOption.skipIfExists;
                resolve(workingObject);
            }
        });
    },
    verifyOptionsSkipIfNotExists: function (workingObject) {
        return new Promise((resolve, reject) => {
            if (workingObject.userOption.skipIfNotExists == undefined) {
                workingObject.validatedOption.skipIfNotExists = conf.DEFAULT_SKIPIFNOTEXISTS;
                if (!workingObject.validatedOption.quiet)
                    console.warn(util.format("Warning: skipIfNotExists undefined, defaulting to %s.", workingObject.validatedOption.skipIfNotExists));
                resolve(workingObject);

            } else if (typeof (workingObject.userOption.skipIfNotExists) !== "boolean") {
                if (u.isBoolean(workingObject.userOption.skipIfNotExists)) {
                    workingObject.validatedOption.skipIfNotExists = u.isTrue(workingObject.userOption.skipIfNotExists);
                    resolve(workingObject);

                } else {
                    reject(new Error(
                        util.format("Error: skipIfNotExists is not a boolean value [%s].", workingObject.userOption.skipIfNotExists)
                    ));
                }
            } else {
                workingObject.validatedOption.skipIfNotExists = workingObject.userOption.skipIfNotExists;
                resolve(workingObject);
            }
        });
    },
    verifyOptionsPort: function (workingObject) {
        return new Promise((resolve, reject) => {
            if (workingObject.userOption.port == "" ||
                workingObject.userOption.port == undefined) {
                workingObject.validatedOption.port = conf.DEFAULT_PORT;
                if (!workingObject.validatedOption.quiet)
                    console.info(util.format("Info: port undefined, defaulting to %d.", workingObject.validatedOption.port));
                resolve(workingObject);
            } else if (!Number.isInteger(Number(workingObject.userOption.port))) {
                reject(new Error(
                    util.format("Error: port is not an integer number [%s].", workingObject.userOption.port)
                ));
            } else {
                workingObject.validatedOption.port = Number(workingObject.userOption.port);
                resolve(workingObject);
            }
        });
    },
    verifyOptionsRemotePath: function (workingObject) {
        return new Promise((resolve, reject) => {
            if (workingObject.userOption.remotePath == "" ||
                workingObject.userOption.remotePath == undefined) {
                workingObject.validatedOption.remotePath = conf.DEFAULT_REMOTEPATH;
                if (!workingObject.validatedOption.quiet)
                    console.warn(util.format("Warning: remotePath undefined, defaulting to current directory. [%s]", workingObject.validatedOption.remotePath));
                resolve(workingObject);
            } else {
                workingObject.validatedOption.remotePath = workingObject.userOption.remotePath;
                resolve(workingObject);
            }
        });
    },
    verifyOptionsLocalPath: function (workingObject) {
        return new Promise((resolve, reject) => {
            if (workingObject.userOption.localPath == "" ||
                workingObject.userOption.localPath == undefined) {
                workingObject.validatedOption.localPath = conf.DEFAULT_LOCALPATH;
                if (!workingObject.validatedOption.quiet)
                    console.warn(util.format("Warning: localPath undefined, defaulting to current directory. [%s]", workingObject.validatedOption.localPath));
                resolve(workingObject);
            } else {
                workingObject.validatedOption.localPath = workingObject.userOption.localPath;
                resolve(workingObject);
            }
        });
    },
    verifyOptionsAutoCreateLocalPath: function (workingObject) {
        return new Promise((resolve, reject) => {
            if (workingObject.userOption.autoCreateLocalPath == undefined) {
                workingObject.validatedOption.autoCreateLocalPath = conf.DEFAULT_AUTOCREATELOCALPATH;
                resolve(workingObject);
            } else if (typeof (workingObject.userOption.autoCreateLocalPath) !== "boolean") {
                if (u.isBoolean(workingObject.userOption.autoCreateLocalPath)) {
                    workingObject.validatedOption.autoCreateLocalPath = u.isTrue(workingObject.userOption.autoCreateLocalPath);
                    resolve(workingObject);
                } else {
                    reject(new Error(
                        util.format("Error: autoCreateLocalPath is not a boolean value [%s].", workingObject.userOption.autoCreateLocalPath)
                    ));
                }
            } else {
                workingObject.validatedOption.autoCreateLocalPath = workingObject.userOption.autoCreateLocalPath;
                resolve(workingObject);
            }

        });
    },
    verifyOptionsVerbose: function (workingObject) {
        return new Promise((resolve, reject) => {
            if (workingObject.userOption.verbose == undefined) {
                workingObject.validatedOption.verbose = conf.DEFAULT_VERBOSE;
                resolve(workingObject);
            } else if (typeof (workingObject.userOption.verbose) !== "boolean") {
                if (u.isBoolean(workingObject.userOption.verbose)) {
                    workingObject.validatedOption.verbose = u.isTrue(workingObject.userOption.verbose);
                    resolve(workingObject);
                } else {
                    reject(new Error(
                        util.format("Error: verbose is not a boolean value [%s].", workingObject.userOption.verbose)
                    ));
                }
            } else {
                workingObject.validatedOption.verbose = workingObject.userOption.verbose;
                resolve(workingObject);
            }
        });
    },
    verifyOptionsQuiet: function (workingObject) {
        return new Promise((resolve, reject) => {
            if (workingObject.userOption.quiet == undefined) {
                workingObject.validatedOption.quiet = conf.DEFAULT_QUIET;
                resolve(workingObject);
            } else if (typeof (workingObject.userOption.quiet) !== "boolean") {
                if (u.isBoolean(workingObject.userOption.quiet)) {
                    workingObject.validatedOption.quiet = u.isTrue(workingObject.userOption.quiet);
                    resolve(workingObject);
                } else {
                    reject(new Error(
                        util.format("Error: quiet is not a boolean value [%s].", workingObject.userOption.quiet)
                    ));
                }
            } else {
                workingObject.validatedOption.quiet = workingObject.userOption.quiet;
                resolve(workingObject);
            }
        });
    }
}