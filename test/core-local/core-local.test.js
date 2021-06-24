const util = require('util');
const core = require("../../lib/core-local");
const fs1 = require('../../lib/core-util');

test("verifyLocalPath/path-not-directory", () => {
    var workingObject = {
        validatedOption: {
            localPath: "./test-data/aeeeaaa"
        }
    };
    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isPathExist").mockImplementation(() => { return true; });
    jest.spyOn(fs1, "isDirectory").mockImplementation(() => { return false; });

    var msg = util.format("Error: localPath exists and is not a directory. [%s]", workingObject.validatedOption.localPath);
    expect(core.verifyLocalPath(workingObject)).rejects.toThrow(msg);

    expect(fs1.isPathExist).toBeCalled();
    expect(fs1.isDirectory).toBeCalled();
});

test("verifyLocalPath/path-exist", () => {
    var workingObject = {
        validatedOption: {
            localPath: "./test-data/aeeeaaa"
        }
    };
    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isPathExist").mockImplementation(() => { return true; });
    jest.spyOn(fs1, "isDirectory").mockImplementation(() => { return true; });

    expect(core.verifyLocalPath(workingObject)).resolves;
    expect(fs1.isPathExist).toBeCalled();
    expect(fs1.isDirectory).toBeCalled();
});

test("verifyLocalPath/path-auto-create", () => {
    var workingObject = {
        validatedOption: {
            localPath: "./test-data/aeeeaaa"
        }
    };
    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isPathExist").mockImplementation(() => { return false; });
    jest.spyOn(fs1, "mkdir").mockImplementation(() => { });

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    var msg = util.format("Warning: localPath not exists, auto create. [%s]", workingObject.validatedOption.localPath);

    expect(core.verifyLocalPath(workingObject)).resolves;
    expect(fs1.isPathExist).toBeCalled();
    expect(fs1.mkdir).toBeCalled();
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);

});

test("verifyLocalPath/path-auto-create/quiet", () => {
    var workingObject = {
        validatedOption: {
            localPath: "./test-data/aeeeaaa",
            quiet: true
        }
    };
    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isPathExist").mockImplementation(() => { return false; });
    jest.spyOn(fs1, "mkdir").mockImplementation(() => { });

    global.console.warn = jest.fn();

    expect(core.verifyLocalPath(workingObject)).resolves;
    expect(fs1.isPathExist).toBeCalled();
    expect(fs1.mkdir).toBeCalled();
    expect(console.warn).not.toBeCalled();
});

