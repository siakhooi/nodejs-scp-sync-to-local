const co0 = require("../../lib/core-options");

test("crossVerify/skip/error", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { skipIfExists: true, skipIfNotExists: true }
    };

    expect(co0.crossVerify(workingObject))
        .rejects
        .toThrow("Error: skipIfExists and skipIfNotExists are mutually exclusive.");
});

test.each([
    [true, false],
    [false, true],
    [false, false]
])("crossVerify/skip/ok", (exist, notExist) => {
    var workingObject = {
        userOption: {},
        validatedOption: { skipIfExists: exist, skipIfNotExists: notExist }
    };

    expect(co0.crossVerify(workingObject))
        .resolves;
});

test("crossVerify/checkQuietAndVerbose/override", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true, verbose: true }
    };

    var consoleOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { consoleOutput.push(s); })
    var msg = "Warn: Both quiet and verbose set to true, verbose is ignored.";

    co0.crossVerify(workingObject).then((workingObject) => {
        expect(console.warn).toBeCalled();
        expect(consoleOutput).toContain(msg);
    });
});

test.each([
    [true, false],
    [false, true],
    [false, false]
])("crossVerify/checkQuietAndVerbose/ok", (quiet, verbose) => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: quiet, verbose: verbose }
    };

    global.console.warn = jest.fn().mockImplementation((s) => { consoleOutput.push(s); })
    co0.crossVerify(workingObject).then((workingObject) => {
        expect(console.warn).not.toBeCalled();
    });
});
