corefilters = require("../../lib/core-filters");
const fs1 = require('../../lib/core-util');

var remoteFile = {
    size: 0
}
test("filter/skipIfSameSize/true", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isSameSize").mockImplementation(() => { return false; });

    return expect(corefilters.skipIfSameSize(localFile, remoteFile)).toBe(true);
});

test("filter/skipIfSameSize/false", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isSameSize").mockImplementation(() => { return true; });

    return expect(corefilters.skipIfSameSize(localFile, remoteFile)).toBe(false);
});

