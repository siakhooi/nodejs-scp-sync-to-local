const util = require('util');
const cov = require("../../lib/core-options-verify");

const DEFAULT_REMOTEPATH = ".";

test("verifyRemotePath", () => {
    var workingObject = {
        userOption: { remotePath: "/home/testuser/files/" },
        validatedOption: {}
    };

    expect(cov.verifyRemotePath(workingObject))
        .resolves
        .toMatchObject({
            userOption: { remotePath: "/home/testuser/files/" },
            validatedOption: { remotePath: "/home/testuser/files/" }
        });
});

test("verifyRemotePath/blank", () => {
    var workingObject = {
        userOption: { remotePath: "" },
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: remotePath undefined, defaulting to current directory. [%s]", DEFAULT_REMOTEPATH);

    expect(cov.verifyRemotePath(workingObject))
        .resolves
        .toMatchObject({
            userOption: { remotePath: "" },
            validatedOption: { remotePath: DEFAULT_REMOTEPATH }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});
test("verifyRemotePath/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: remotePath undefined, defaulting to current directory. [%s]", DEFAULT_REMOTEPATH);
    expect(cov.verifyRemotePath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { remotePath: DEFAULT_REMOTEPATH }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test("verifyRemotePath/blank/quiet", () => {
    var workingObject = {
        userOption: { remotePath: "" },
        validatedOption: { quiet: true }
    };

    global.console.warn = jest.fn();

    expect(cov.verifyRemotePath(workingObject))
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
test("verifyRemotePath/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };

    global.console.warn = jest.fn();
    expect(cov.verifyRemotePath(workingObject))
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
