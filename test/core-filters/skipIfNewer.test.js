corefilters = require("../../lib/core-filters");
const fs1 = require('../../lib/core-util');

var remoteFile = {
    modifyTime: 0
}
test("filter/skipIfNewer/true", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isNewer").mockImplementation(() => { return false; });

    return expect(corefilters.skipIfNewer(localFile, remoteFile)).toBe(true);
});

test("filter/skipIfNewer/false", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isNewer").mockImplementation(() => { return true; });

    return expect(corefilters.skipIfNewer(localFile, remoteFile)).toBe(false);
});

