const cu = require('../../lib/core-util')
const dt = require('../mock-data/common-data-sets')

test.each(dt.TrueDataSet)('isBoolean/TrueDataSet', (value) => {
  return expect(cu.isBoolean(value)).toBe(true)
})
test.each(dt.FalseDataSet)('isBoolean/FalseDataSet', (value) => {
  return expect(cu.isBoolean(value)).toBe(true)
})
test.each(dt.NotBooleanDataSet)('isBoolean/NotBooleanDataSet', (value) => {
  return expect(cu.isBoolean(value)).toBe(false)
})
