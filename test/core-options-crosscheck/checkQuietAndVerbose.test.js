const coc = require("../../lib/core-options-crosscheck");

test("checkQuietAndVerbose/override", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true, verbose: true }
    };

    var consoleOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { consoleOutput.push(s); })
    var msg = "Warn: Both quiet and verbose set to true, verbose is ignored.";

    expect(coc.checkQuietAndVerbose(workingObject))
        .resolves;
    expect(console.warn).toBeCalled();
    expect(consoleOutput).toContain(msg);

});

test.each([
    [true, false],
    [false, true],
    [false, false]
])("checkQuietAndVerbose", (quiet, verbose) => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: quiet, verbose: verbose }
    };

    global.console.warn = jest.fn().mockImplementation((s) => { consoleOutput.push(s); })
    expect(coc.checkQuietAndVerbose(workingObject))
        .resolves;
    expect(console.warn).not.toBeCalled();
});
