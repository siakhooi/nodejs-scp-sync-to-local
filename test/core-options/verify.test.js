const co0 = require("../../lib/core-options");

test("verify/defaults", () => {
    var workingObject = {
        userOption: {
            username: "testuser",
            password: "testpassword"
        },
        validatedOption: {}
    };
    return expect(co0.verify(workingObject))
        .resolves
        .toMatchObject({
            validatedOption: {
                host: "localhost",
                username: "testuser",
                password: "testpassword",
                remotePath: '.',
                localPath: '.',
                port: 22,
                skipIfExists: true,
                skipIfNotExists: false,
                skipIfNewer: false,
                skipIfOlder: false,
                skipIfSameAge: false,
                skipIfBigger: false,
                skipIfSmaller: false,
                skipIfSameSize: false,
                autoCreateLocalPath: true,
                verbose: false,
                quiet: false
            }
        });
});

test("verify/all", () => {
    var workingObject = {
        userOption: {
            host: "xxxxx",
            username: "testuser",
            password: "testpassword",
            remotePath: '/home/testuser/test-data/',
            localPath: './test-data/',
            port: 2222,
            skipIfExists: false,
            skipIfNotExists: true,
            skipIfNewer: true,
            skipIfOlder: true,
            skipIfSameAge: true,
            skipIfBigger: true,
            skipIfSmaller: true,
            skipIfSameSize: true,
            autoCreateLocalPath: false,
            verbose: true,
            quiet: true
        },
        validatedOption: {}
    };
    return expect(co0.verify(workingObject))
        .resolves
        .toMatchObject({
            validatedOption: {
                host: "xxxxx",
                username: "testuser",
                password: "testpassword",
                remotePath: '/home/testuser/test-data/',
                localPath: './test-data/',
                port: 2222,
                skipIfExists: false,
                skipIfNotExists: true,
                skipIfNewer: true,
                skipIfOlder: true,
                skipIfSameAge: true,
                skipIfBigger: true,
                skipIfSmaller: true,
                skipIfSameSize: true,
                autoCreateLocalPath: false,
                verbose: true,
                quiet: true
            }
        });
});
