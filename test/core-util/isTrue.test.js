const cu = require('../../lib/core-util')
const dt = require('../mock-data/common-data-sets')

test.each(dt.TrueDataSet)('core-util/isTrue/TrueDataSet', (value) => {
  return expect(cu.isTrue(value)).toBe(true)
})
test.each(dt.FalseDataSet)('core-util/isTrue/FalseDataSet', (value) => {
  return expect(cu.isTrue(value)).toBe(false)
})
test.each(dt.NotBooleanDataSet)('core-util/isTrue/NotBooleanDataSet', (value) => {
  return expect(cu.isTrue(value)).toBe(true)
})
