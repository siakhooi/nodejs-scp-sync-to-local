const util = require('util');
const cov = require("../../lib/core-options-verify");

const DEFAULT_SKIPIFBIGGER = false;


test.each([true, "Y", "on", 1, "y", "yes"])("verifySkipIfBigger/true", (value) => {
    var workingObject = {
        userOption: { skipIfBigger: value },
        validatedOption: {}
    };

    expect(cov.verifySkipIfBigger(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfBigger: value },
            validatedOption: { skipIfBigger: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifySkipIfBigger/false", (value) => {
    var workingObject = {
        userOption: { skipIfBigger: value },
        validatedOption: {}
    };

    expect(cov.verifySkipIfBigger(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfBigger: value },
            validatedOption: { skipIfBigger: false }
        });
});

test("verifySkipIfBigger/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(cov.verifySkipIfBigger(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { skipIfBigger: DEFAULT_SKIPIFBIGGER }
        });
    var msg = util.format("Warning: skipIfBigger undefined, defaulting to %s.", DEFAULT_SKIPIFBIGGER);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453", "xxx", 567])("verifySkipIfBigger/not-boolaen", (value) => {
    var workingObject = {
        userOption: { skipIfBigger: value },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfBigger is not a boolean value [%s].", value);
    expect(cov.verifySkipIfBigger(workingObject))
        .rejects
        .toThrow(msg);
});

test("verifySkipIfBigger/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };
    global.console.warn = jest.fn();

    expect(cov.verifySkipIfBigger(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfBigger: DEFAULT_SKIPIFBIGGER,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});
