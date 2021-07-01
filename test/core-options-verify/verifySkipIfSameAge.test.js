const util = require('util');
const cov = require("../../lib/core-options-verify");

const DEFAULT_SKIPIFSAMEAGE = false;


test.each([true, "Y", "on", 1, "y", "yes"])("verifySkipIfSameAge/true", (value) => {
    var workingObject = {
        userOption: { skipIfSameAge: value },
        validatedOption: {}
    };

    expect(cov.verifySkipIfSameAge(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfSameAge: value },
            validatedOption: { skipIfSameAge: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifySkipIfSameAge/false", (value) => {
    var workingObject = {
        userOption: { skipIfSameAge: value },
        validatedOption: {}
    };

    expect(cov.verifySkipIfSameAge(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfSameAge: value },
            validatedOption: { skipIfSameAge: false }
        });
});

test("verifySkipIfSameAge/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(cov.verifySkipIfSameAge(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { skipIfSameAge: DEFAULT_SKIPIFSAMEAGE }
        });
    var msg = util.format("Warning: skipIfSameAge undefined, defaulting to %s.", DEFAULT_SKIPIFSAMEAGE);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453", "xxx", 567])("verifySkipIfSameAge/not-boolaen", (value) => {
    var workingObject = {
        userOption: { skipIfSameAge: value },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfSameAge is not a boolean value [%s].", value);
    expect(cov.verifySkipIfSameAge(workingObject))
        .rejects
        .toThrow(msg);
});

test("verifySkipIfSameAge/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };
    global.console.warn = jest.fn();

    expect(cov.verifySkipIfSameAge(workingObject))
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
