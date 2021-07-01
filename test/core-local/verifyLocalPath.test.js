const util = require('util');
const cl0 = require("../../lib/core-local");
const cuf = require('../../lib/core-util-fs');

beforeEach(() => jest.clearAllMocks());

test("verifyLocalPath/path-exist", () => {
    var workingObject = {
        validatedOption: { localPath: "./test-data/aeeeaaa2" }
    };
    jest.spyOn(cuf, "isPathExist").mockImplementation(() => { return true; });
    jest.spyOn(cuf, "isDirectory").mockImplementation(() => { return true; });

    expect(cl0.verifyLocalPath(workingObject)).resolves;
    expect(cuf.isPathExist).toBeCalled();
    expect(cuf.isDirectory).toBeCalled();
});

test("verifyLocalPath/path-not-exist/not-directory", () => {
    var workingObject = {
        validatedOption: { localPath: "./test-data/aeeeaaa1" }
    };
    jest.spyOn(cuf, "isPathExist").mockImplementation(() => { return true; });
    jest.spyOn(cuf, "isDirectory").mockImplementation(() => { return false; });

    var msg = util.format("Error: localPath exists and is not a directory. [%s]", workingObject.validatedOption.localPath);
    expect(cl0.verifyLocalPath(workingObject)).rejects.toThrow(msg);

    expect(cuf.isPathExist).toBeCalled();
    expect(cuf.isDirectory).toBeCalled();
});


test("verifyLocalPath/path-not-exist/auto-create", () => {
    var workingObject = {
        validatedOption: {
            localPath: "./test-data/aeeeaaa3",
            autoCreateLocalPath: true
        }
    };
    jest.spyOn(cuf, "isPathExist").mockImplementation(() => { return false; });
    jest.spyOn(cuf, "mkdir").mockImplementation(() => { });

    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    var msg = util.format("Warning: localPath not exists, auto create. [%s]", workingObject.validatedOption.localPath);

    expect(cl0.verifyLocalPath(workingObject)).resolves;
    expect(cuf.isPathExist).toBeCalled();
    expect(cuf.mkdir).toBeCalled();
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);

});

test("verifyLocalPath/path-not-exist/auto-create/quiet", () => {
    var workingObject = {
        validatedOption: {
            localPath: "./test-data/aeeeaaa4",
            autoCreateLocalPath: true,
            quiet: true
        }
    };
    jest.mock("../../lib/core-util");
    jest.spyOn(cuf, "isPathExist").mockImplementation(() => { return false; });
    jest.spyOn(cuf, "mkdir").mockImplementation(() => { });

    global.console.warn = jest.fn();

    expect(cl0.verifyLocalPath(workingObject)).resolves;
    expect(cuf.isPathExist).toBeCalled();
    expect(cuf.mkdir).toBeCalled();
    expect(console.warn).not.toBeCalled();
});

test("verifyLocalPath/path-not-exist/not-auto-create", () => {
    var workingObject = {
        validatedOption: {
            localPath: "./test-data/aeeeaaa5",
            autoCreateLocalPath: false
        }
    };
    jest.mock("../../lib/core-util");
    jest.spyOn(cuf, "isPathExist").mockImplementation(() => { return false; });
    jest.spyOn(cuf, "mkdir").mockImplementation(() => { });

    var msg = util.format("Error: localPath not exists and autoCreateLocalPath=false. [%s]", workingObject.validatedOption.localPath);

    expect(cl0.verifyLocalPath(workingObject)).rejects.toThrow(msg);
    expect(cuf.isPathExist).toBeCalled();
    expect(cuf.mkdir).not.toBeCalled();

});

