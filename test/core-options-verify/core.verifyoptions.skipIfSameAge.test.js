const util = require('util');
const core = require("../../lib/core-options");

const DEFAULT_SKIPIFSAMEAGE = false;


test.each([true, "Y", "on", 1, "y", "yes"])("verifyOptionsSkipIfSameAge/true", (value) => {
    var workingObject = {
        userOption: { skipIfSameAge: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfSameAge(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfSameAge: value },
            validatedOption: { skipIfSameAge: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifyOptionsSkipIfSameAge/false", (value) => {
    var workingObject = {
        userOption: { skipIfSameAge: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfSameAge(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfSameAge: value },
            validatedOption: { skipIfSameAge: false }
        });
});

test("verifyOptionsSkipIfSameAge/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(core.verifyOptionsSkipIfSameAge(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfSameAge: DEFAULT_SKIPIFSAMEAGE
            }
        });
    var msg = util.format("Warning: skipIfSameAge undefined, defaulting to %s.", DEFAULT_SKIPIFSAMEAGE);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453", "xxx", 567])("verifyOptionsSkipIfSameAge/not-boolaen", (value) => {
    var workingObject = {
        userOption: {
            skipIfSameAge: value
        },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfSameAge is not a boolean value [%s].", value);
    expect(core.verifyOptionsSkipIfSameAge(workingObject))
        .rejects
        .toThrow(msg);
});

test("verifyOptionsSkipIfSameAge/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };
    global.console.warn = jest.fn();

    expect(core.verifyOptionsSkipIfSameAge(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfSameAge: DEFAULT_SKIPIFSAMEAGE,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});
