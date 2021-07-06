const cf0 = require("../../filters");
const cuf = require('../../lib/core-util-fs');

var localFile = 'xxxx';

test.each([
    [true, false],
    [false, true]
])("skipIfExists", (test_value, test_result) => {

    jest.spyOn(cuf, "isPathExist").mockImplementation(() => { return test_value; });

    return expect(cf0.skipIfExists(localFile)).toBe(test_result);
});
