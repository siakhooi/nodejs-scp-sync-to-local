const fs = require('fs');
const cus = require('../../lib/core-util-fs');

test.each([
    true, false
])("isDirectory", (test_value) => {
    var localFile = 'xxxx';

    jest.mock("fs");
    jest.spyOn(fs, "lstatSync").mockImplementation(() => { return { isDirectory: function (f) { return test_value } }; });

    return expect(cus.isDirectory(localFile)).toBe(test_value);
});
