const util = require('util');
const core = require("../../lib/core-options");

const DEFAULT_SKIPIFBIGGER = false;


test.each([true, "Y", "on", 1, "y", "yes"])("verifyOptionsSkipIfBigger/true", (value) => {
    var workingObject = {
        userOption: { skipIfBigger: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfBigger(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfBigger: value },
            validatedOption: { skipIfBigger: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifyOptionsSkipIfBigger/false", (value) => {
    var workingObject = {
        userOption: { skipIfBigger: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfBigger(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfBigger: value },
            validatedOption: { skipIfBigger: false }
        });
});

test("verifyOptionsSkipIfBigger/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(core.verifyOptionsSkipIfBigger(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfBigger: DEFAULT_SKIPIFBIGGER
            }
        });
    var msg = util.format("Warning: skipIfBigger undefined, defaulting to %s.", DEFAULT_SKIPIFBIGGER);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453", "xxx", 567])("verifyOptionsSkipIfBigger/not-boolaen", (value) => {
    var workingObject = {
        userOption: {
            skipIfBigger: value
        },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfBigger is not a boolean value [%s].", value);
    expect(core.verifyOptionsSkipIfBigger(workingObject))
        .rejects
        .toThrow(msg);
});

test("verifyOptionsSkipIfBigger/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };
    global.console.warn = jest.fn();

    expect(core.verifyOptionsSkipIfBigger(workingObject))
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
