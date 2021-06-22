const core = require("../../lib/core-options.js");

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
            scpClient: null,
            remoteFileList: [],
            filteredFileList: [],
            allDownloadPromises: []
        });
});
