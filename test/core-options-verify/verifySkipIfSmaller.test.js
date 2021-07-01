const util = require('util');
const cov = require("../../lib/core-options-verify");

const DEFAULT_SKIPIFSMALLER = false;


test.each([true, "Y", "on", 1, "y", "yes"])("verifySkipIfSmaller/true", (value) => {
    var workingObject = {
        userOption: { skipIfSmaller: value },
        validatedOption: {}
    };

    expect(cov.verifySkipIfSmaller(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfSmaller: value },
            validatedOption: { skipIfSmaller: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifySkipIfSmaller/false", (value) => {
    var workingObject = {
        userOption: { skipIfSmaller: value },
        validatedOption: {}
    };

    expect(cov.verifySkipIfSmaller(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfSmaller: value },
            validatedOption: { skipIfSmaller: false }
        });
});

test("verifySkipIfSmaller/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(cov.verifySkipIfSmaller(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { skipIfSmaller: DEFAULT_SKIPIFSMALLER }
        });
    var msg = util.format("Warning: skipIfSmaller undefined, defaulting to %s.", DEFAULT_SKIPIFSMALLER);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453", "xxx", 567])("verifySkipIfSmaller/not-boolaen", (value) => {
    var workingObject = {
        userOption: { skipIfSmaller: value },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfSmaller is not a boolean value [%s].", value);
    expect(cov.verifySkipIfSmaller(workingObject))
        .rejects
        .toThrow(msg);
});

test("verifySkipIfSmaller/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };
    global.console.warn = jest.fn();

    expect(cov.verifySkipIfSmaller(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfSmaller: DEFAULT_SKIPIFSMALLER,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});
