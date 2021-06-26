const scp = require('node-scp');

exports.login = function (workingObject) {
    return new Promise((resolve, reject) => {
        var validatedOption = workingObject.validatedOption;
        var scpLoginOption = workingObject.scpLoginOption;

        scpLoginOption.host = validatedOption.host;
        scpLoginOption.port = validatedOption.port;
        scpLoginOption.username = validatedOption.username;
        scpLoginOption.password = validatedOption.password;

        return scp(scpLoginOption)
            .then((client) => {
                workingObject.scpClient = client;
                resolve(workingObject);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

