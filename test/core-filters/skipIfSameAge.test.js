corefilters = require("../../lib/core-filters");
const fs1 = require('../../lib/core-util');

var remoteFile = {
    modifyTime: 0
}
test("filter/skipIfSameAge/true", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isSameAge").mockImplementation(() => { return false; });

    return expect(corefilters.skipIfSameAge(localFile, remoteFile)).toBe(true);
});

test("filter/skipIfSameAge/false", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isSameAge").mockImplementation(() => { return true; });

    return expect(corefilters.skipIfSameAge(localFile, remoteFile)).toBe(false);
});

