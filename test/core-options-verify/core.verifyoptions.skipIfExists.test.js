const core = require("../../lib/core-options");
const util = require('util');

const DEFAULT_SKIPIFEXISTS = true;

test.each([
    true, "Y", "on", 1, "y", "yes"
])("verifyOptionsSkipIfExists/true", (value) => {
    var workingObject = {
        userOption: { skipIfExists: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfExists: value },
            validatedOption: { skipIfExists: true }
        });
});

test.each([
    false, "N", "off", 0, "n", "no"
])("verifyOptionsSkipIfExists/false", (value) => {
    var workingObject = {
        userOption: { skipIfExists: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfExists: value },
            validatedOption: { skipIfExists: false }
        });
});

test("verifyOptionsSkipIfExists/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(core.verifyOptionsSkipIfExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { skipIfExists: DEFAULT_SKIPIFEXISTS }
        });
    var msg = util.format("Warning: skipIfExists undefined, defaulting to %s.", DEFAULT_SKIPIFEXISTS);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453"])("verifyOptionsSkipIfExists/not-boolean", (value) => {
    var workingObject = {
        userOption: { skipIfExists: value },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfExists is not a boolean value [%s].", value);
    expect(core.verifyOptionsSkipIfExists(workingObject))
        .rejects
        .toThrow(msg);
});

test("verifyOptionsSkipIfExists/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };
    global.console.warn = jest.fn();

    expect(core.verifyOptionsSkipIfExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfExists: DEFAULT_SKIPIFEXISTS,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});
