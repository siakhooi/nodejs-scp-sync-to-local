corefilters = require("../../lib/core-filters");
const fs1 = require('../../lib/core-util');

test("filter/skipIfExists/true", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isPathExist").mockImplementation(() => { return false; });

    return expect(corefilters.skipIfExists(localFile)).toBe(true);
});

test("filter/skipIfExists/false", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isPathExist").mockImplementation(() => { return true; });

    return expect(corefilters.skipIfExists(localFile)).toBe(false);
});

