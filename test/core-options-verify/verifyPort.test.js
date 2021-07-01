const util = require('util');
const cov = require("../../lib/core-options-verify");

const DEFAULT_PORT = 22;


test.each([23, "34"])("verifyPort", (value) => {
    var workingObject = {
        userOption: { port: value },
        validatedOption: {}
    };

    expect(cov.verifyPort(workingObject))
        .resolves
        .toMatchObject({
            userOption: { port: value },
            validatedOption: { port: Number(value) }
        });
});

test("verifyPort/blank", () => {
    var workingObject = {
        userOption: { port: "" },
        validatedOption: {}
    };

    var consoleOutput = [];
    global.console.info = jest.fn().mockImplementation((s) => { consoleOutput.push(s); })
    var msg = util.format("Info: port undefined, defaulting to %d.", DEFAULT_PORT);
    expect(cov.verifyPort(workingObject))
        .resolves
        .toMatchObject({
            userOption: { port: "" },
            validatedOption: { port: DEFAULT_PORT }
        });
    expect(console.info).toBeCalled();
    expect(consoleOutput).toContain(msg);
});
test("verifyPort/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    var consoleOutput = [];
    global.console.info = jest.fn().mockImplementation((s) => { consoleOutput.push(s); })
    var msg = util.format("Info: port undefined, defaulting to %d.", DEFAULT_PORT);
    expect(cov.verifyPort(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { port: DEFAULT_PORT }
        });
    expect(console.info).toBeCalled();
    expect(consoleOutput).toContain(msg);
});

test("verifyPort/not-number", () => {
    var workingObject = {
        userOption: { port: "xxx" },
        validatedOption: {}
    };

    var msg = util.format("Error: port is not an integer number [%s].", workingObject.userOption.port);
    expect(cov.verifyPort(workingObject))
        .rejects
        .toThrow(msg);
});


test("verifyPort/blank/quiet", () => {
    var workingObject = {
        userOption: { port: "" },
        validatedOption: { quiet: true }
    };

    global.console.info = jest.fn();
    expect(cov.verifyPort(workingObject))
        .resolves
        .toMatchObject({
            userOption: { port: "" },
            validatedOption: {
                port: DEFAULT_PORT,
                quiet: true
            }
        });
    expect(console.info).not.toBeCalled();
});
test("verifyPort/undefined/quiet", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true }
    };

    global.console.info = jest.fn();
    expect(cov.verifyPort(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                port: DEFAULT_PORT,
                quiet: true
            }
        });
    expect(console.info).not.toBeCalled();
});

