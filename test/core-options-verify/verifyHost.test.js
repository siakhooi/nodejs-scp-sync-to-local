const util = require('util');
const cov = require("../../lib/core-options-verify");

const DEFAULT_HOSTNAME = "localhost";

test("verifyHost", () => {
    var workingObject = {
        userOption: { host: "localhost" },
        validatedOption: {}
    };

    expect(cov.verifyHost(workingObject))
        .resolves
        .toMatchObject({
            userOption: { host: "localhost" },
            validatedOption: { host: "localhost" }
        });
});

test("verifyHost/blank", () => {
    var workingObject = {
        userOption: { host: "" },
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: host undefined, defaulting to %s.", DEFAULT_HOSTNAME)

    expect(cov.verifyHost(workingObject))
        .resolves
        .toMatchObject({
            userOption: { host: "" },
            validatedOption: { host: DEFAULT_HOSTNAME }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});
test("verifyHost/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })
    var msg = util.format("Warning: host undefined, defaulting to %s.", DEFAULT_HOSTNAME)

    expect(cov.verifyHost(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { host: DEFAULT_HOSTNAME }
        });
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test("verifyHost/blank/quiet", () => {
    var workingObject = {
        userOption: { host: "" },
        validatedOption: { quiet: true }
    };

    global.console.warn = jest.fn();

    expect(cov.verifyHost(workingObject))
        .resolves
        .toMatchObject({
            userOption: { host: "" },
            validatedOption: {
                host: DEFAULT_HOSTNAME,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});
test("verifyHost/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };

    global.console.warn = jest.fn();

    expect(cov.verifyHost(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                host: DEFAULT_HOSTNAME,
                quiet: true
            }
        });
    expect(console.warn).not.toBeCalled();
});
