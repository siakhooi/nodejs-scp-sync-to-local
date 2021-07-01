const util = require('util');
const cov = require("../../lib/core-options-verify");

const DEFAULT_SKIPIFNOTEXISTS = false;


test.each([true, "Y", "on", 1, "y", "yes"])("verifySkipIfNotExists/true", (value) => {
    var workingObject = {
        userOption: { skipIfNotExists: value },
        validatedOption: {}
    };

    expect(cov.verifySkipIfNotExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfNotExists: value },
            validatedOption: { skipIfNotExists: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifySkipIfNotExists/false", (value) => {
    var workingObject = {
        userOption: { skipIfNotExists: value },
        validatedOption: {}
    };

    expect(cov.verifySkipIfNotExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfNotExists: value },
            validatedOption: { skipIfNotExists: false }
        });
});

test("verifySkipIfNotExists/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(cov.verifySkipIfNotExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { skipIfNotExists: DEFAULT_SKIPIFNOTEXISTS }
        });
    var msg = util.format("Warning: skipIfNotExists undefined, defaulting to %s.", DEFAULT_SKIPIFNOTEXISTS);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453", "xxx", 567])("verifySkipIfNotExists/not-boolaen", (value) => {
    var workingObject = {
        userOption: {
            skipIfNotExists: value
        },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfNotExists is not a boolean value [%s].", value);
    expect(cov.verifySkipIfNotExists(workingObject))
        .rejects
        .toThrow(msg);
});

test("verifySkipIfNotExists/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };
    global.console.warn = jest.fn();

    expect(cov.verifySkipIfNotExists(workingObject))
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
