const fs = require('fs');
const cuf = require('../../lib/core-util-fs');

test.each([
    [100, true],
    [0, false]
])("isSameAge", (test_value, test_result) => {
    var localFile = 'xxxx';

    jest.mock("fs");
    jest.spyOn(fs, "statSync").mockImplementation(() => { return { mtime: test_value }; });

    return expect(cuf.isSameAge(localFile, 100)).toBe(test_result);
});
