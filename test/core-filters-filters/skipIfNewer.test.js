const cf0 = require("../../lib/core-filters");
const cuf = require('../../lib/core-util-fs');

var remoteFile = {
    modifyTime: 0
}
var localFile = 'xxxx';

test.each([
    [true, false],
    [false, true]
])("skipIfNewer", (test_value, test_result) => {

    jest.spyOn(cuf, "isNewer").mockImplementation(() => { return test_value; });

    return expect(cf0.skipIfNewer(localFile, remoteFile)).toBe(test_result);
});
