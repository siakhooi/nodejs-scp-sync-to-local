
const dummyFunction = () => { }

exports.TrueDataSet = [true, 'on', 'On', 'ON', 1, 'y', 'Y', 'yes', 'YES', 'true', 'TRUE', '1']
exports.FalseDataSet = [false, 'off', 'Off', 'OFF', 0, 'n', 'N', 'no', 'NO', 'false', 'FALSE', '0']
exports.BlankValueDataSet = ['', null, undefined]
exports.IntegerDataSet = [34, '65', 46677]

exports.NotBooleanDataSet = ['ANC', '3453', 'xxx', '%%', ' ', 567, 3.3, [], {}, { x: 1 }, dummyFunction, class { }]
exports.NotIntegerDataSet = ['ANC', ' ', '^^', true, 3.3, {}, [], { x: 1 }, dummyFunction, class { }]
exports.NotFunctionDataSet = ['ANC', 3453, 3.6, true, [], {}]

exports.CorrectPortNumber = [1, 65535, 22, 300, 6455]
exports.IncorrectPortNumber = [0, 65536, 100100]

test('dummyFunction', () => {
  expect(dummyFunction()).toBeUndefined()
})
