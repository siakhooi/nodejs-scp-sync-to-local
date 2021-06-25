const util = require('util');
const core = require("../../lib/core-options");

const DEFAULT_SKIPIFNOTEXISTS = false;


test.each([true, "Y", "on", 1, "y", "yes"])("verifyOptionsSkipIfNotExists/true", (value) => {
    var workingObject = {
        userOption: { skipIfNotExists: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfNotExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfNotExists: value },
            validatedOption: { skipIfNotExists: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifyOptionsSkipIfNotExists/false", (value) => {
    var workingObject = {
        userOption: { skipIfNotExists: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfNotExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfNotExists: value },
            validatedOption: { skipIfNotExists: false }
        });
});

test("verifyOptionsSkipIfNotExists/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(core.verifyOptionsSkipIfNotExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfNotExists: DEFAULT_SKIPIFNOTEXISTS
            }
        });
    var msg = util.format("Warning: skipIfNotExists undefined, defaulting to %s.", DEFAULT_SKIPIFNOTEXISTS);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453", "xxx", 567])("verifyOptionsSkipIfNotExists/not-boolaen", (value) => {
    var workingObject = {
        userOption: {
            skipIfNotExists: value
        },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfNotExists is not a boolean value [%s].", value);
    expect(core.verifyOptionsSkipIfNotExists(workingObject))
        .rejects
        .toThrow(msg);
});

test("verifyOptionsSkipIfNotExists/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };
    global.console.warn = jest.fn();

    expect(core.verifyOptionsSkipIfNotExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfNotExists: DEFAULT_SKIPIFNOTEXISTS,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});
