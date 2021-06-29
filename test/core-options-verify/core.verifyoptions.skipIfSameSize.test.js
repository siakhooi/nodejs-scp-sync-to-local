const util = require('util');
const core = require("../../lib/core-options");

const DEFAULT_SKIPIFSAMESIZE = false;


test.each([true, "Y", "on", 1, "y", "yes"])("verifyOptionsSkipIfSameSize/true", (value) => {
    var workingObject = {
        userOption: { skipIfSameSize: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfSameSize(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfSameSize: value },
            validatedOption: { skipIfSameSize: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifyOptionsSkipIfSameSize/false", (value) => {
    var workingObject = {
        userOption: { skipIfSameSize: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfSameSize(workingObject))
        .resolves
        .toMatchObject({
            userOption: { skipIfSameSize: value },
            validatedOption: { skipIfSameSize: false }
        });
});

test("verifyOptionsSkipIfSameSize/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(core.verifyOptionsSkipIfSameSize(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfSameSize: DEFAULT_SKIPIFSAMESIZE
            }
        });
    var msg = util.format("Warning: skipIfSameSize undefined, defaulting to %s.", DEFAULT_SKIPIFSAMESIZE);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453", "xxx", 567])("verifyOptionsSkipIfSameSize/not-boolaen", (value) => {
    var workingObject = {
        userOption: {
            skipIfSameSize: value
        },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfSameSize is not a boolean value [%s].", value);
    expect(core.verifyOptionsSkipIfSameSize(workingObject))
        .rejects
        .toThrow(msg);
});

test("verifyOptionsSkipIfSameSize/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };
    global.console.warn = jest.fn();

    expect(core.verifyOptionsSkipIfSameSize(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfSameSize: DEFAULT_SKIPIFSAMESIZE,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});
