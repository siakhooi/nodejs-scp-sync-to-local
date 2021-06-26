const corefilters = require("../../lib/core-filters");
const fs1 = require('../../lib/core-util');
const mockdata = require('./mock-data')

test.each([true, false])("filter/setupFilters/conflict", (value) => {
    var workingObject = {
        validatedOption: { localPath: '.' },
        fileFilters: [corefilters.skipIfExists, corefilters.skipIfNotExists],
        remoteFileList: mockdata.mockRemoteFileList,
        filteredFileList: []
    };
    jest.spyOn(fs1, "isPathExist").mockReturnValue(value);

    return expect(corefilters.filterFiles(workingObject))
        .resolves.not
        .toMatchObject({
            filteredFileList: [
                { name: 'Mock_File_1.zip' },
                { name: 'Mock_File_2.zip' }
            ]
        });
});
