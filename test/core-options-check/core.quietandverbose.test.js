const core = require("../../lib/core-options-check");
const util = require('util');

test("quietAndVerbose-override", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { quiet: true, verbose: true }
    };

    var consoleOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { consoleOutput.push(s); })
    var msg = "Warn: Both quiet and verbose set to true, verbose is ignored.";

    expect(core.quietAndVerbose(workingObject))
        .resolves;
    expect(console.warn).toBeCalled();
    expect(consoleOutput).toContain(msg);

});

test.each([
    [true, false],
    [false, true],
    [false, false]
])("quietAndVerbose", (quiet, verbose) => {
    var workingObject = {
        userOption: {},
        validatedOption: { skipIfExists: quiet, skipIfNotExists: verbose }
    };

    global.console.warn = jest.fn().mockImplementation((s) => { consoleOutput.push(s); })
    expect(core.verifySkipExistsExclusive(workingObject))
        .resolves;
    expect(console.warn).not.toBeCalled();
});
