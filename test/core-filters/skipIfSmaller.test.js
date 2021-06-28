corefilters = require("../../lib/core-filters");
const fs1 = require('../../lib/core-util');

var remoteFile = {
    size: 0
}
test("filter/skipIfSmaller/true", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isSmaller").mockImplementation(() => { return false; });

    return expect(corefilters.skipIfSmaller(localFile, remoteFile)).toBe(true);
});

test("filter/skipIfSmaller/false", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isSmaller").mockImplementation(() => { return true; });

    return expect(corefilters.skipIfSmaller(localFile, remoteFile)).toBe(false);
});

