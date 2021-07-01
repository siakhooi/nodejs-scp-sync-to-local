const fs = require('fs');
const cuf = require('../../lib/core-util-fs');

test.each([
    [0, true],
    [100, false]
])("isSmaller", (test_value, test_result) => {
    var localFile = 'xxxx';

    jest.mock("fs");
    jest.spyOn(fs, "statSync").mockImplementation(() => { return { size: test_value }; });

    return expect(cuf.isSmaller(localFile, 50)).toBe(test_result);
});
