corefilters = require("../../lib/core-filters");
const fs1 = require('../../lib/core-util');

var remoteFile = {
    size: 0
}
test("filter/skipIfBigger/true", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isBigger").mockImplementation(() => { return false; });

    return expect(corefilters.skipIfBigger(localFile, remoteFile)).toBe(true);
});

test("filter/skipIfBigger/false", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isBigger").mockImplementation(() => { return true; });

    return expect(corefilters.skipIfBigger(localFile, remoteFile)).toBe(false);
});

