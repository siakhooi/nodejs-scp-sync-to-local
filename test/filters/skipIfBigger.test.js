const cf0 = require("../../filters");
const cuf = require('../../lib/core-util-fs');

var remoteFile = {
    size: 0
}
var localFile = 'xxxx';

test.each([
    [true, false],
    [false, true]
])("skipIfBigger", (test_value, test_result) => {

    jest.spyOn(cuf, "isBigger").mockImplementation(() => { return test_value; });

    return expect(cf0.skipIfBigger(localFile, remoteFile)).toBe(test_result);
});
