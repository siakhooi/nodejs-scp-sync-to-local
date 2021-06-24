const util = require('util');
const core = require("../../lib/core-options");
const conf = require('../../index.conf')

const DEFAULT_HOSTNAME = "localhost";

test("verifyOptionsHost", () => {
    var workingObject = {
        userOption: {
            host: "localhost"
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsHost(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                host: "localhost"
            },
            validatedOption: {
                host: "localhost"
            }
        });
});

test("verifyOptionsHost-blank", () => {
    var workingObject = {
        userOption: {
            host: ""
        },
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: host undefined, defaulting to %s.", DEFAULT_HOSTNAME)

    expect(core.verifyOptionsHost(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                host: ""
            },
            validatedOption: {
                host: DEFAULT_HOSTNAME
            }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});
test("verifyOptionsHost-undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: host undefined, defaulting to %s.", DEFAULT_HOSTNAME)

    expect(core.verifyOptionsHost(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                host: DEFAULT_HOSTNAME
            }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});
