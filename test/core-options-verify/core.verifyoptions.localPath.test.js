const util = require('util');
const core = require("../../lib/core-options.js");

test("verifyOptionsLocalPath", () => {
    var workingObject = {
        userOption: {
            localPath: "/home/testuser/files/"
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                localPath: "/home/testuser/files/"
            },
            validatedOption: {
                localPath: "/home/testuser/files/"
            }
        });
});

test("verifyOptionsLocalPath-blank", () => {
    var workingObject = {
        userOption: {
            localPath: ""
        },
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: localPath undefined, defaulting to current directory. [%s]", ".");

    expect(core.verifyOptionsLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                localPath: ""
            },
            validatedOption: {
                localPath: "."
            }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});
test("verifyOptionsLocalPath-undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: localPath undefined, defaulting to current directory. [%s]", ".");
    expect(core.verifyOptionsLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                localPath: "."
            }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});
