const util = require('util');
const core = require("../../lib/core-options");

const DEFAULT_REMOTEPATH = ".";

test("verifyOptionsRemotePath", () => {
    var workingObject = {
        userOption: { remotePath: "/home/testuser/files/" },
        validatedOption: {}
    };

    expect(core.verifyOptionsRemotePath(workingObject))
        .resolves
        .toMatchObject({
            userOption: { remotePath: "/home/testuser/files/" },
            validatedOption: { remotePath: "/home/testuser/files/" }
        });
});

test("verifyOptionsRemotePath/blank", () => {
    var workingObject = {
        userOption: { remotePath: "" },
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: remotePath undefined, defaulting to current directory. [%s]", DEFAULT_REMOTEPATH);

    expect(core.verifyOptionsRemotePath(workingObject))
        .resolves
        .toMatchObject({
            userOption: { remotePath: "" },
            validatedOption: {
                remotePath: DEFAULT_REMOTEPATH
            }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});
test("verifyOptionsRemotePath/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: remotePath undefined, defaulting to current directory. [%s]", DEFAULT_REMOTEPATH);
    expect(core.verifyOptionsRemotePath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                remotePath: DEFAULT_REMOTEPATH
            }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test("verifyOptionsRemotePath/blank/quiet", () => {
    var workingObject = {
        userOption: { remotePath: "" },
        validatedOption: { quiet: true }
    };

    global.console.warn = jest.fn();

    expect(core.verifyOptionsRemotePath(workingObject))
        .resolves
        .toMatchObject({
            userOption: { remotePath: "" },
            validatedOption: {
                remotePath: DEFAULT_REMOTEPATH,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});
test("verifyOptionsRemotePath/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };

    global.console.warn = jest.fn();
    expect(core.verifyOptionsRemotePath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                remotePath: DEFAULT_REMOTEPATH,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});
