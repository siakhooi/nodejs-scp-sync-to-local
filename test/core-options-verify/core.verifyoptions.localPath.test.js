const util = require('util');
const core = require("../../lib/core-options.js");
const conf = require('../../index.conf.js')

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
    var msg = util.format("Warning: localPath undefined, defaulting to current directory. [%s]", conf.DEFAULT_LOCALPATH);

    expect(core.verifyOptionsLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                localPath: ""
            },
            validatedOption: {
                localPath: conf.DEFAULT_LOCALPATH
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
    var msg = util.format("Warning: localPath undefined, defaulting to current directory. [%s]", conf.DEFAULT_LOCALPATH);
    expect(core.verifyOptionsLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                localPath: conf.DEFAULT_LOCALPATH
            }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});
