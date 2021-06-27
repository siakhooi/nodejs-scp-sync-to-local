corefilters = require("../../lib/core-filters");
const fs1 = require('../../lib/core-util');

var remoteFile = {
    modifyTime: 0
}
test("filter/skipIfOlder/true", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isOlder").mockImplementation(() => { return false; });

    return expect(corefilters.skipIfOlder(localFile, remoteFile)).toBe(true);
});

test("filter/skipIfOlder/false", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isOlder").mockImplementation(() => { return true; });

    return expect(corefilters.skipIfOlder(localFile, remoteFile)).toBe(false);
});

