const corefilters = require("../../lib/core-filters");
const fs1 = require('../../lib/core-util');
const mockdata = require('../mock-remotefilelist')

test("filter/setupFilters/skipIfSmaller/fileNotExist", () => {
    var workingObject = {
        validatedOption: { localPath: '.' },
        fileFilters: [corefilters.skipIfSmaller],
        remoteFileList: mockdata.mockRemoteFileList,
        filteredFileList: []
    };
    jest.spyOn(fs1, "isSmaller").mockReturnValue(false);

    return expect(corefilters.filterFiles(workingObject))
        .resolves
        .toMatchObject({
            filteredFileList: [
                { name: 'Mock_File_1.zip' },
                { name: 'Mock_File_2.zip' }
            ]
        });
});

test("filter/setupFilters/skipIfSmaller/fileExist", () => {
    var workingObject = {
        validatedOption: { localPath: '.' },
        fileFilters: [corefilters.skipIfSmaller],
        remoteFileList: mockdata.mockRemoteFileList,
        filteredFileList: []
    };
    jest.spyOn(fs1, "isSmaller").mockReturnValue(true);

    return expect(corefilters.filterFiles(workingObject))
        .resolves.not
        .toMatchObject({
            filteredFileList: [
                { name: 'Mock_File_1.zip' },
                { name: 'Mock_File_2.zip' }
            ]
        });
});