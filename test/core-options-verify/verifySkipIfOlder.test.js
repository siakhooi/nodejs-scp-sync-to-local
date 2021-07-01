const util = require('util');
const cov = require("../../lib/core-options-verify");

const DEFAULT_SKIPIFOLDER = false;


test.each([true, "Y", "on", 1, "y", "yes"])("verifySkipIfOlder/true", (value) => {
    var workingObject = {
        userOption: { skipIfOlder: value },
        validatedOption: {}
    };

    expect(cov.verifySkipIfOlder(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfOlder: value },
            validatedOption: { skipIfOlder: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifySkipIfOlder/false", (value) => {
    var workingObject = {
        userOption: { skipIfOlder: value },
        validatedOption: {}
    };

    expect(cov.verifySkipIfOlder(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfOlder: value },
            validatedOption: { skipIfOlder: false }
        });
});

test("verifySkipIfOlder/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(cov.verifySkipIfOlder(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { skipIfOlder: DEFAULT_SKIPIFOLDER }
        });
    var msg = util.format("Warning: skipIfOlder undefined, defaulting to %s.", DEFAULT_SKIPIFOLDER);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453", "xxx", 567])("verifySkipIfOlder/not-boolaen", (value) => {
    var workingObject = {
        userOption: { skipIfOlder: value },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfOlder is not a boolean value [%s].", value);
    expect(cov.verifySkipIfOlder(workingObject))
        .rejects
        .toThrow(msg);
});

test("verifySkipIfOlder/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };
    global.console.warn = jest.fn();

    expect(cov.verifySkipIfOlder(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfOlder: DEFAULT_SKIPIFOLDER,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});
