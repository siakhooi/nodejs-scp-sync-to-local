const cu = require('../../lib/core-util')
const dt = require('../mock-data/common-data-sets')

test.each(dt.TrueDataSet)('isTrue/TrueDataSet', (value) => {
  return expect(cu.isTrue(value)).toBe(true)
})
test.each(dt.FalseDataSet)('isTrue/FalseDataSet', (value) => {
  return expect(cu.isTrue(value)).toBe(false)
})
test.each(dt.NotBooleanDataSet)('isTrue/NotBooleanDataSet', (value) => {
  return expect(cu.isTrue(value)).toBe(true)
})
