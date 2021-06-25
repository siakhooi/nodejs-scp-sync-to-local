const core = require("../../lib/core-options");
const conf = require('../../index.conf')

/* -- Sample Output
scp-sync-to-local 0.10.0

[Parameters]
               host: 192.168.0.106
               port: 22
           username: testuser
           password: **********
         remotePath: /home/testuser/data
          localPath: ./test-data
       skipIfExists: false
    skipIfNotExists: false
autoCreateLocalPath: true
            verbose: true
              quiet: false
*/

test.each([
    [true, true],
    [false, false],
    [false, true]
])("printOptions-No", (verbose, quiet) => {
    var workingObject = {
        validatedOption: {
            host: "localhost",
            username: "testuser",
            password: "testpassword",
            remotePath: "/home/testuser/data",
            localPath: "./test-data",
            port: 22,
            skipIfExists: false,
            skipIfNotExists: false,
            autoCreateLocalPath: true,
            verbose: verbose,
            quiet: quiet
        }
    };

    var logOutput = [];
    global.console.log = jest.fn();

    expect(core.printOptions(workingObject)).resolves;
    expect(console.log).not.toBeCalled();
});


test.each([
    [true, false]
])("printOptions-Yes", (verbose, quiet) => {
    var workingObject = {
        validatedOption: {
            host: "localhost",
            username: "testuser",
            password: "testpassword",
            remotePath: "/home/testuser/data",
            localPath: "./test-data",
            port: 22,
            skipIfExists: false,
            skipIfNotExists: false,
            autoCreateLocalPath: true,
            verbose: verbose,
            quiet: quiet
        }
    };

    var logValues = [
        ["%s %s", conf.PROGRAM_NAME, conf.PROGRAM_VERSION],
        ["", undefined, undefined],
        ["[Parameters]", undefined, undefined],
        ["               host: %s", "localhost", undefined],
        ["               port: %d", 22, undefined],
        ["           username: %s", "testuser", undefined],
        ["           password: %s", conf.PASSWORD_MASK, undefined],
        ["         remotePath: %s", "/home/testuser/data", undefined],
        ["          localPath: %s", "./test-data", undefined],
        ["       skipIfExists: %s", false, undefined],
        ["    skipIfNotExists: %s", false, undefined],
        ["autoCreateLocalPath: %s", true, undefined],
        ["            verbose: %s", verbose, undefined],
        ["              quiet: %s", quiet, undefined]
    ];

    var logOutput = [];
    global.console.log = jest.fn().mockImplementation((s, i, j) => { logOutput.push([s, i, j]); })

    expect(core.printOptions(workingObject)).resolves;
    expect(console.log).toBeCalled();
    logValues.forEach((x) => expect(logOutput).toContainEqual(x));
});
