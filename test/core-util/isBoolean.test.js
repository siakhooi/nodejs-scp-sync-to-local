const cu = require('../../lib/core-util')
const dt = require('../mock-data/common-data-sets')

test.each(dt.TrueDataSet)('isBoolean/true', (value) => {
  return expect(cu.isBoolean(value)).toBe(true)
})
test.each(dt.FalseDataSet)('isBoolean/false', (value) => {
  return expect(cu.isBoolean(value)).toBe(true)
})
test.each([
  'ABC', 1234
])('isBoolean/not-boolean', (value) => {
  return expect(cu.isBoolean(value)).toBe(false)
})
