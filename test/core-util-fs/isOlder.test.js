const fs = require('fs');
const cuf = require('../../lib/core-util-fs');

test.each([
    [0, true],
    [100, false]
])("isOlder", (test_value, test_result) => {
    var localFile = 'xxxx';

    jest.mock("fs");
    jest.spyOn(fs, "statSync").mockImplementation(() => { return { mtime: test_value }; });

    return expect(cuf.isOlder(localFile, 50)).toBe(test_result);
});
