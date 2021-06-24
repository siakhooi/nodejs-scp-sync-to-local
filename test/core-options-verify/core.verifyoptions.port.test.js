const util = require('util');
const core = require("../../lib/core-options");

const DEFAULT_PORT = 22;


test.each([23, "34"])("verifyOptionsPort", (value) => {
    var workingObject = {
        userOption: {
            port: value
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsPort(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                port: value
            },
            validatedOption: {
                port: Number(value)
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

    var consoleOutput = [];
    global.console.info = jest.fn().mockImplementation((s) => { consoleOutput.push(s); })
    var msg = util.format("Info: port undefined, defaulting to %d.", DEFAULT_PORT);
    expect(core.verifyOptionsPort(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                port: ""
            },
            validatedOption: {
                port: DEFAULT_PORT
            }
        });
    expect(console.info).toBeCalled();
    expect(consoleOutput).toContain(msg);
});
test("verifyOptionsPort-undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    var consoleOutput = [];
    global.console.info = jest.fn().mockImplementation((s) => { consoleOutput.push(s); })
    var msg = util.format("Info: port undefined, defaulting to %d.", DEFAULT_PORT);
    expect(core.verifyOptionsPort(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                port: DEFAULT_PORT
            }
        });
    expect(console.info).toBeCalled();
    expect(consoleOutput).toContain(msg);
});

test("verifyOptionsPort-not number", () => {
    var workingObject = {
        userOption: {
            port: "xxx"
        },
        validatedOption: {}
    };

    var msg = util.format("Error: port is not an integer number [%s].", workingObject.userOption.port);
    expect(core.verifyOptionsPort(workingObject))
        .rejects
        .toThrow(msg);
});
