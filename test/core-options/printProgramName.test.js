const co0 = require("../../lib/core-options");
const conf = require('../../index.conf')

/* -- Sample Output
scp-sync-to-local 0.10.0

*/

test.each([
    [true, true],
    [false, false],
    [false, true]
])("printProgramName/No", (verbose, quiet) => {
    var workingObject = {
        validatedOption: {
            verbose: verbose,
            quiet: quiet
        }
    };

    global.console.log = jest.fn();

    co0.printProgramName(workingObject).then(() => {
        expect(console.log).not.toBeCalled();
    });
});


test.each([
    [true, false]
])("printProgramName/Yes", (verbose, quiet) => {
    var workingObject = {
        validatedOption: {

            verbose: verbose,
            quiet: quiet
        }
    };

    var logValues = [
        ["%s %s", conf.PROGRAM_NAME, conf.PROGRAM_VERSION],
        ["", undefined, undefined],
    ];

    var logOutput = [];
    global.console.log = jest.fn().mockImplementation((s, i, j) => { logOutput.push([s, i, j]); })

    expect(co0.printProgramName(workingObject)).resolves;
    expect(console.log).toBeCalled();
    logValues.forEach((x) => expect(logOutput).toContainEqual(x));
    logOutput.forEach((x) => expect(logValues).toContainEqual(x));
});


test.each([
    [true, false]
])("printProgramName/Yes", (verbose, quiet) => {
    var workingObject = {
        validatedOption: {
            verbose: verbose,
            quiet: quiet
        }
    };

    var logValues = [
        ["%s %s", conf.PROGRAM_NAME, conf.PROGRAM_VERSION],
        ["", undefined, undefined],
    ];

    var logOutput = [];
    global.console.log = jest.fn().mockImplementation((s, i, j) => { logOutput.push([s, i, j]); })

    expect(co0.printProgramName(workingObject)).resolves;
    expect(console.log).toBeCalled();
    logValues.forEach((x) => expect(logOutput).toContainEqual(x));
    logOutput.forEach((x) => expect(logValues).toContainEqual(x));
});
