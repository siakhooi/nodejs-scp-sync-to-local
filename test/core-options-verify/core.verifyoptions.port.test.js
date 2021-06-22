const util = require('util');
const core = require("../../lib/core-options.js");
const conf = require('../../index.conf.js')

test("verifyOptionsPort", () => {
    var workingObject = {
        userOption: {
            port: 23
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsPort(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                port: 23
            },
            validatedOption: {
                port: 23
            }
        });
});

test("verifyOptionsPort-blank", () => {
    var workingObject = {
        userOption: {
            port: ""
        },
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: port undefined, defaulting to %d.", conf.DEFAULT_PORT);
    expect(core.verifyOptionsPort(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                port: ""
            },
            validatedOption: {
                port: conf.DEFAULT_PORT
            }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});
test("verifyOptionsPort-undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: port undefined, defaulting to %d.", conf.DEFAULT_PORT);
    expect(core.verifyOptionsPort(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                port: conf.DEFAULT_PORT
            }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});
