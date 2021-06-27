const util = require('util');
const core = require("../../lib/core-options");

const DEFAULT_SKIPIFNEWER = false;


test.each([true, "Y", "on", 1, "y", "yes"])("verifyOptionsSkipIfNewer/true", (value) => {
    var workingObject = {
        userOption: { skipIfNewer: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfNewer(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfNewer: value },
            validatedOption: { skipIfNewer: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifyOptionsSkipIfNewer/false", (value) => {
    var workingObject = {
        userOption: { skipIfNewer: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfNewer(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfNewer: value },
            validatedOption: { skipIfNewer: false }
        });
});

test("verifyOptionsSkipIfNewer/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(core.verifyOptionsSkipIfNewer(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfNewer: DEFAULT_SKIPIFNEWER
            }
        });
    var msg = util.format("Warning: skipIfNewer undefined, defaulting to %s.", DEFAULT_SKIPIFNEWER);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453", "xxx", 567])("verifyOptionsSkipIfNewer/not-boolaen", (value) => {
    var workingObject = {
        userOption: {
            skipIfNewer: value
        },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfNewer is not a boolean value [%s].", value);
    expect(core.verifyOptionsSkipIfNewer(workingObject))
        .rejects
        .toThrow(msg);
});

test("verifyOptionsSkipIfNewer/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };
    global.console.warn = jest.fn();

    expect(core.verifyOptionsSkipIfNewer(workingObject))
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
