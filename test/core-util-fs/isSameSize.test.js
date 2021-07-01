const fs = require('fs');
const cuf = require('../../lib/core-util-fs');

test.each([
    [50, true],
    [100, false]
])("isSameSize", (test_value, test_result) => {
    var localFile = 'xxxx';

    jest.mock("fs");
    jest.spyOn(fs, "statSync").mockImplementation(() => { return { size: test_value }; });

    return expect(cuf.isSameSize(localFile, 50)).toBe(test_result);
});
