corefilters = require("../../lib/core-filters");
const fs1 = require('../../lib/core-util');

test("filter/skipIfNotExists/true", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isPathExist").mockImplementation(() => { return true; });

    return expect(corefilters.skipIfNotExists(localFile)).toBe(true);
});

test("filter/skipIfNotExists/false", () => {
    var localFile = 'xxxx';

    jest.mock("../../lib/core-util");
    jest.spyOn(fs1, "isPathExist").mockImplementation(() => { return false; });

    return expect(corefilters.skipIfNotExists(localFile)).toBe(false);
});
