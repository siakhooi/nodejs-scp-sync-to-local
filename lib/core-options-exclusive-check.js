module.exports = {
    verifySkipExistsExclusive: function (workingObject) {
        return new Promise((resolve, reject) => {
            if (workingObject.validatedOption.skipIfExists &&
                workingObject.validatedOption.skipIfNotExists) {
                reject("Error: skipIfExists and skipIfNotExists are mutually exclusive.");
            } else {
                resolve(workingObject);
            }
        });
    }
}