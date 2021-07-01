const cf0 = require("../../lib/core-filters");
const cuf = require('../../lib/core-util-fs');

var remoteFile = {
    size: 0
}
var localFile = 'xxxx';

test.each([
    [true, false],
    [false, true]
])("skipIfSmaller", (test_value, test_result) => {

    jest.spyOn(cuf, "isSmaller").mockImplementation(() => { return test_value; });

    return expect(cf0.skipIfSmaller(localFile, remoteFile)).toBe(test_result);
});
