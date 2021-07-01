exports.checkExistsRule = function (workingObject) {
    return new Promise((resolve, reject) => {
        if (workingObject.validatedOption.skipIfExists &&
            workingObject.validatedOption.skipIfNotExists) {
            reject(new Error("Error: skipIfExists and skipIfNotExists are mutually exclusive."));
        } else {
            resolve(workingObject);
        }
    });
}
exports.checkQuietAndVerbose = function (workingObject) {
    return new Promise((resolve, reject) => {
        if (workingObject.validatedOption.quiet &&
            workingObject.validatedOption.verbose) {
            var msg = "Warn: Both quiet and verbose set to true, verbose is ignored.";
            console.warn(msg);
        }
        resolve(workingObject);
    });
}
