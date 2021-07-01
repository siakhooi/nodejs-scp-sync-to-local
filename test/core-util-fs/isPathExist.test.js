const fs = require('fs');
const cus = require('../../lib/core-util-fs');

test.each([
    true, false
])("isPathExist", (test_value) => {
    var localFile = 'xxxx';

    jest.mock("fs");
    jest.spyOn(fs, "existsSync").mockImplementation(() => { return test_value; });

    return expect(cus.isPathExist(localFile)).toBe(test_value);
});
