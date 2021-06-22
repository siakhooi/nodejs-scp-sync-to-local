const core = require("../../lib/core-options.js");
const conf = require('../../index.conf.js')
const util = require('util');

test.each([true, "Y", "on", 1, "y", "yes"])("verifyOptionsSkipIfNotExists-Good-True", (value) => {
    var workingObject = {
        userOption: {
            skipIfNotExists: value
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfNotExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                skipIfNotExists: value
            },
            validatedOption: {
                skipIfNotExists: true
            }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifyOptionsSkipIfNotExists-Good-False", (value) => {
    var workingObject = {
        userOption: {
            skipIfNotExists: value
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfNotExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                skipIfNotExists: value
            },
            validatedOption: {
                skipIfNotExists: false
            }
        });
});

test("verifyOptionsSkipIfNotExists-undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(core.verifyOptionsSkipIfNotExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfNotExists: conf.DEFAULT_SKIPIFNOTEXISTS
            }
        });
    var msg = util.format("Warning: skipIfNotExists undefined, defaulting to %s.", conf.DEFAULT_SKIPIFNOTEXISTS);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453", "xxx", 567])("verifyOptionsSkipIfNotExists-Not Boolaen", (value) => {
    var workingObject = {
        userOption: {
            skipIfNotExists: value
        },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfNotExists is not a boolean value [%s].", value);
    expect(core.verifyOptionsSkipIfNotExists(workingObject))
        .rejects
        .toMatch(msg);
});
