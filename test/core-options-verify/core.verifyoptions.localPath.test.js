const util = require('util');
const core = require("../../lib/core-options");

const DEFAULT_LOCALPATH = ".";

test("verifyOptionsLocalPath", () => {
    var workingObject = {
        userOption: { localPath: "/home/testuser/files/" },
        validatedOption: {}
    };

    expect(core.verifyOptionsLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: { localPath: "/home/testuser/files/" },
            validatedOption: { localPath: "/home/testuser/files/" }
        });
});

test("verifyOptionsLocalPath/blank", () => {
    var workingObject = {
        userOption: { localPath: "" },
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: localPath undefined, defaulting to current directory. [%s]", DEFAULT_LOCALPATH);

    expect(core.verifyOptionsLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: { localPath: "" },
            validatedOption: {
                localPath: DEFAULT_LOCALPATH
            }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});
test("verifyOptionsLocalPath/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: localPath undefined, defaulting to current directory. [%s]", DEFAULT_LOCALPATH);
    expect(core.verifyOptionsLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                localPath: DEFAULT_LOCALPATH
            }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test("verifyOptionsLocalPath/blank/quiet", () => {
    var workingObject = {
        userOption: { localPath: "" },
        validatedOption: { quiet: true }
    };

    global.console.warn = jest.fn();

    expect(core.verifyOptionsLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: { localPath: "" },
            validatedOption: {
                localPath: DEFAULT_LOCALPATH,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});
test("verifyOptionsLocalPath/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };

    global.console.warn = jest.fn();
    expect(core.verifyOptionsLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                localPath: DEFAULT_LOCALPATH,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});
