const cf0 = require("../../lib/core-filters");
const cuf = require('../../lib/core-util-fs');

var remoteFile = {
    size: 0
}
var localFile = 'xxxx';

test.each([
    [true, false],
    [false, true]
])("skipIfSameSize", (test_value, test_result) => {

    jest.spyOn(cuf, "isSameSize").mockImplementation(() => { return test_value; });

    return expect(cf0.skipIfSameSize(localFile, remoteFile)).toBe(test_result);
});
