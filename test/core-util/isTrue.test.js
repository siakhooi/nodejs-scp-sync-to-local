const cu = require('../../lib/core-util')
const dt = require('../mock-data/common-data-sets')

test.each(dt.TrueDataSet)('isTrue/true', (value) => {
  return expect(cu.isTrue(value)).toBe(true)
})
test.each([
  '0', 'N', 'n', 'off', 'Off', 'No', 'NO', 0, false, 'FALSE'
])('isTrue/false', (value) => {
  return expect(cu.isTrue(value)).toBe(false)
})
test.each([
  'ABC', 123
])('isTrue/not-boolean', (value) => {
  return expect(cu.isTrue(value)).toBe(true)
})
