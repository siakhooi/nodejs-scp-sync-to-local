const core = require("../../lib/core-options");

test("initOptions", () => {
    var option = {
        host: "localhost",
        username: "testuser",
        password: "testpassword"
    };
    return expect(core.initOptions(option))
        .resolves
        .toMatchObject({
            userOption: {
                host: "localhost",
                username: "testuser",
                password: "testpassword"
            },
            validatedOption: {},
            scpLoginOption: {},
            fileFilters: [],
            scpClient: null,
            remoteFileList: [],
            filteredFileList: [],
            allDownloadPromises: []
        });
});
