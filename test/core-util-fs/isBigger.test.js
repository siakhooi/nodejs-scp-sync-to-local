const fs = require('fs');
const cuf = require('../../lib/core-util-fs');

test.each([
    [100, true],
    [0, false]
])("isBigger", (test_value, test_result) => {
    var localFile = 'xxxx';

    jest.mock("fs");
    jest.spyOn(fs, "statSync").mockImplementation(() => { return { size: test_value }; });

    return expect(cuf.isBigger(localFile, 50)).toBe(test_result);
});
