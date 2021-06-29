const corefilters = require("../../lib/core-filters");
const fs1 = require('../../lib/core-util');
const mockdata = require('../mock-remotefilelist')

test("filter/setupFilters/skipIfSameSize/fileNotExist", () => {
    var workingObject = {
        validatedOption: { localPath: '.' },
        fileFilters: [corefilters.skipIfSameSize],
        remoteFileList: mockdata.mockRemoteFileList,
        filteredFileList: []
    };
    jest.spyOn(fs1, "isSameSize").mockReturnValue(false);

    return expect(corefilters.filterFiles(workingObject))
        .resolves
        .toMatchObject({
            filteredFileList: [
                { name: 'Mock_File_1.zip' },
                { name: 'Mock_File_2.zip' }
            ]
        });
});

test("filter/setupFilters/skipIfSameSize/fileExist", () => {
    var workingObject = {
        validatedOption: { localPath: '.' },
        fileFilters: [corefilters.skipIfSameSize],
        remoteFileList: mockdata.mockRemoteFileList,
        filteredFileList: []
    };
    jest.spyOn(fs1, "isSameSize").mockReturnValue(true);

    return expect(corefilters.filterFiles(workingObject))
        .resolves.not
        .toMatchObject({
            filteredFileList: [
                { name: 'Mock_File_1.zip' },
                { name: 'Mock_File_2.zip' }
            ]
        });
});
