const util = require('util');
const cov = require("../../lib/core-options-verify");

const DEFAULT_SKIPIFNEWER = false;


test.each([true, "Y", "on", 1, "y", "yes"])("verifySkipIfNewer/true", (value) => {
    var workingObject = {
        userOption: { skipIfNewer: value },
        validatedOption: {}
    };

    expect(cov.verifySkipIfNewer(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfNewer: value },
            validatedOption: { skipIfNewer: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifySkipIfNewer/false", (value) => {
    var workingObject = {
        userOption: { skipIfNewer: value },
        validatedOption: {}
    };

    expect(cov.verifySkipIfNewer(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfNewer: value },
            validatedOption: { skipIfNewer: false }
        });
});

test("verifySkipIfNewer/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(cov.verifySkipIfNewer(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { skipIfNewer: DEFAULT_SKIPIFNEWER }
        });
    var msg = util.format("Warning: skipIfNewer undefined, defaulting to %s.", DEFAULT_SKIPIFNEWER);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453", "xxx", 567])("verifySkipIfNewer/not-boolaen", (value) => {
    var workingObject = {
        userOption: { skipIfNewer: value },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfNewer is not a boolean value [%s].", value);
    expect(cov.verifySkipIfNewer(workingObject))
        .rejects
        .toThrow(msg);
});

test("verifySkipIfNewer/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };
    global.console.warn = jest.fn();

    expect(cov.verifySkipIfNewer(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfNewer: DEFAULT_SKIPIFNEWER,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});