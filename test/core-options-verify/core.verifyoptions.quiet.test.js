const util = require('util');
const core = require("../../lib/core-options.js");
const conf = require('../../index.conf.js')

test.each([true, "Y", "on", 1, "y", "yes"])("verifyOptionsQuiet-Good-True", (value) => {
    var workingObject = {
        userOption: {
            quiet: value
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsQuiet(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                quiet: value
            },
            validatedOption: {
                quiet: true
            }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifyOptionsQuiet-Good-False", (value) => {
    var workingObject = {
        userOption: {
            quiet: value
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsQuiet(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                quiet: value
            },
            validatedOption: {
                quiet: false
            }
        });
});

test("verifyOptionsQuiet-undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    expect(core.verifyOptionsQuiet(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                quiet: conf.DEFAULT_QUIET
            }
        });
});

test.each(["ANC", "3453"])("verifyOptionsQuiet-Not Boolean", (value) => {
    var workingObject = {
        userOption: {
            quiet: value
        },
        validatedOption: {}
    };
    var msg = util.format("Error: quiet is not a boolean value [%s].", value);
    expect(core.verifyOptionsQuiet(workingObject))
        .rejects
        .toThrow(msg);
});
