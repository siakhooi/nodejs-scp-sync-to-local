
exports.TrueDataSet = [true, 'on', 'On', 'ON', 1, 'y', 'Y', 'yes', 'YES', 'true', 'TRUE', '1']
exports.FalseDataSet = [false, 'off', 'Off', 'OFF', 0, 'n', 'N', 'no', 'NO', 'false', 'FALSE', '0']
exports.BlankValueDataSet = ['', null, undefined]

exports.NotBooleanDataSet = ['ANC', '3453', 'xxx', '%%', ' ', 567, 3.3, [], {}, { x: 1 }, () => { }, class { }]
exports.NotIntegerDataSet = ['ANC', ' ', '^^', true, 3.3, {}, [], { x: 1 }, () => { }, class { }]
