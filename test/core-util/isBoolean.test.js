const cu = require('../../lib/core-util')
const dt = require('../mock-data/common-data-sets')

test.each(dt.TrueDataSet)('core-util/isBoolean/TrueDataSet', (value) => {
  return expect(cu.isBoolean(value)).toBe(true)
})
test.each(dt.FalseDataSet)('core-util/isBoolean/FalseDataSet', (value) => {
  return expect(cu.isBoolean(value)).toBe(true)
})
test.each(dt.NotBooleanDataSet)('core-util/isBoolean/NotBooleanDataSet', (value) => {
  return expect(cu.isBoolean(value)).toBe(false)
})
