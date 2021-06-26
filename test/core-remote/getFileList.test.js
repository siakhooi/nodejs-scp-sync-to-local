scp = require('node-scp');
const coreremote = require('../../lib/core-remote');

//beforeEach(() => jest.clearAllMocks());

test('remote/getFileList/success', () => {
    var workingObject = {
        validatedOption: {
            remotePath: "/home/testuser/data",
            quiet: false
        },
        scpClient: scp.mockClient,
        remoteFileList: []
    }
    var consoleOutput = [], writeOutput = [];
    global.process.stdout.write = jest.fn().mockImplementation((s) => { writeOutput.push(s); });
    global.console.info = jest.fn().mockImplementation((s) => { consoleOutput.push(s); });

    var msg1 = "Downloading Remote File List...";
    var msg2 = "done";

    coreremote.getFileList(workingObject).then((workingObject) => {
        expect(workingObject)
            .toMatchObject({
                remoteFileList: [
                    { name: 'Mock_File_1.zip' },
                    { name: 'Mock_File_2.zip' }
                ]
            });
        expect(process.stdout.write).toBeCalled();
        expect(console.info).toBeCalled();
        expect(writeOutput).toContain(msg1);
        expect(consoleOutput).toContain(msg2);

    });

});

test('remote/getFileList/success/quiet', () => {
    var workingObject = {
        validatedOption: {
            remotePath: "/home/testuser/data",
            quiet: true
        },
        scpClient: scp.mockClient,
        remoteFileList: []
    }
    global.process.stdout.write = jest.fn();
    global.console.info = jest.fn();

    coreremote.getFileList(workingObject).then((workingObject) => {
        expect(workingObject)
            .toMatchObject({
                remoteFileList: [
                    { name: 'Mock_File_1.zip' },
                    { name: 'Mock_File_2.zip' }
                ]
            });
        expect(process.stdout.write).not.toBeCalled();
        expect(console.info).not.toBeCalled();

    });
});

test('remote/getFileList/fail', () => {
    var workingObject = {
        validatedOption: {
            remotePath: "/home/testuser/data",
            quiet: false
        },
        scpClient: scp.mockClient,
        remoteFileList: []
    }

    var consoleOutput = [];
    global.process.stdout.write = jest.fn().mockImplementation((s) => { consoleOutput.push(s); })
    var msg = "Downloading Remote File List...";

    expect(coreremote.getFileList(workingObject))
        .rejects
        .toThrow("Mock getList: Fail");
    expect(process.stdout.write).toBeCalled();
    expect(consoleOutput).toContain(msg);
});

test('remote/getFileList/fail/quiet', () => {
    var workingObject = {
        validatedOption: {
            remotePath: "/home/testuser/data",
            quiet: true
        },
        scpClient: scp.mockClient,
        remoteFileList: []
    }

    global.process.stdout.write = jest.fn();

    expect(coreremote.getFileList(workingObject))
        .rejects
        .toThrow("Mock getList: Fail");
    expect(process.stdout.write).not.toBeCalled();
});
