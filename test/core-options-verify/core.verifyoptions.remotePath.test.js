const core = require("../../lib/core-options.js");
const conf = require('../../index.conf.js')
const util = require('util');

test("verifyOptionsRemotePath", () => {
    var workingObject = {
        userOption: {
            remotePath: "/home/testuser/files/"
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsRemotePath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                remotePath: "/home/testuser/files/"
            },
            validatedOption: {
                remotePath: "/home/testuser/files/"
            }
        });
});

test("verifyOptionsRemotePath-blank", () => {
    var workingObject = {
        userOption: {
            remotePath: ""
        },
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: remotePath undefined, defaulting to current directory. [%s]", conf.DEFAULT_REMOTEPATH);

    expect(core.verifyOptionsRemotePath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                remotePath: ""
            },
            validatedOption: {
                remotePath: conf.DEFAULT_REMOTEPATH
            }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});
test("verifyOptionsRemotePath-undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: remotePath undefined, defaulting to current directory. [%s]", conf.DEFAULT_REMOTEPATH);
    expect(core.verifyOptionsRemotePath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                remotePath: conf.DEFAULT_REMOTEPATH
            }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});
